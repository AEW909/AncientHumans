import { expect, test, type Page } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

const routes = [
  { path: "/", heading: "Ancient Human Relatives" },
  { path: "/species", heading: "Explore the branching human family tree" },
  { path: "/quest", heading: "Build your field report" },
  { path: "/report-preview", heading: "Magazine field report" },
] as const;

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear();
  });
});

for (const route of routes) {
  test(`${route.path} renders without page-level horizontal overflow`, async ({ page }) => {
    const consoleErrors = collectConsoleErrors(page);

    await page.goto(route.path, { waitUntil: "networkidle" });

    await expect(page.getByText(route.heading, { exact: false }).first()).toBeVisible();
    await expect(page.locator("[data-nextjs-dialog-overlay]")).toHaveCount(0);

    const metrics = await getLayoutMetrics(page);

    expect(metrics.documentScrollWidth).toBeLessThanOrEqual(metrics.innerWidth + 1);
    expect(metrics.bodyScrollWidth).toBeLessThanOrEqual(metrics.innerWidth + 1);
    expect(consoleErrors).toEqual([]);
  });
}

test("students can download and reupload a webquest work file", async ({ page }, testInfo) => {
  const consoleErrors = collectConsoleErrors(page);

  await page.goto("/quest", { waitUntil: "networkidle" });

  await page.getByLabel("Name").fill("Playwright Student");
  await page.getByLabel("Class").fill("Test Class");
  await page.getByLabel("Date").fill("26 June 2026");

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: "Download work" }).click(),
  ]);

  const downloadPath = path.join(testInfo.outputDir, download.suggestedFilename());
  await download.saveAs(downloadPath);

  const exported = JSON.parse(await fs.readFile(downloadPath, "utf8")) as {
    kind?: string;
    work?: { student?: { name?: string } };
  };

  expect(exported.kind).toBe("ancient-human-relatives-webquest");
  expect(exported.work?.student?.name).toBe("Playwright Student");

  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Reset" }).click();
  await expect(page.getByLabel("Name")).toHaveValue("");

  await page.locator("input[type='file']").setInputFiles(downloadPath);

  await expect(page.getByLabel("Name")).toHaveValue("Playwright Student");
  await expect(page.getByLabel("Class")).toHaveValue("Test Class");
  await expect(page.getByLabel("Date")).toHaveValue("26 June 2026");
  expect(consoleErrors).toEqual([]);
});

test("report preview warns before generating an incomplete draft PDF", async ({ page }) => {
  const consoleErrors = collectConsoleErrors(page);

  await page.goto("/report-preview", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Generate PDF" }).click();

  const dialog = page.getByRole("dialog", { name: "Check before generating" });

  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("Draft PDF check")).toBeVisible();
  await expect(dialog.getByText("Missing:", { exact: true })).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Back to web quest" })).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Keep reviewing" })).toBeVisible();
  expect(consoleErrors).toEqual([]);
});

test("report preview generates a downloadable PDF", async ({ page }, testInfo) => {
  test.setTimeout(75_000);
  const consoleErrors = collectConsoleErrors(page);

  await page.goto("/report-preview", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Generate PDF" }).click();
  await page.getByRole("button", { name: "Generate draft PDF" }).click();

  await expect(page.getByText("Building your report file")).toBeVisible();
  await expect(page.getByText("Draft PDF ready")).toBeVisible({ timeout: 45_000 });

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("link", { name: "Download PDF" }).click(),
  ]);
  const downloadPath = path.join(testInfo.outputDir, download.suggestedFilename());

  await download.saveAs(downloadPath);

  const pdf = await fs.readFile(downloadPath);

  expect(download.suggestedFilename()).toMatch(/\.pdf$/);
  expect(pdf.byteLength).toBeGreaterThan(10_000);
  expect(pdf.subarray(0, 4).toString()).toBe("%PDF");
  expect(consoleErrors).toEqual([]);
});

test("report preview offers browser print fallback when generation fails", async ({ page }) => {
  const consoleErrors = collectConsoleErrors(page);

  await page.addInitScript(() => {
    window.localStorage.setItem("ancient-human-relatives-force-pdf-error", "true");
  });
  await page.goto("/report-preview", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Generate PDF" }).click();
  await page.getByRole("button", { name: "Generate draft PDF" }).click();

  await expect(page.getByRole("dialog", { name: "Use browser print instead" })).toBeVisible();
  await expect(page.getByText("PDF generation failed. Use browser print instead.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Use browser print" })).toBeVisible();
  expect(consoleErrors).toEqual([]);
});

async function getLayoutMetrics(page: Page) {
  return page.evaluate(() => ({
    bodyScrollWidth: document.body.scrollWidth,
    documentScrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));
}

function collectConsoleErrors(page: Page) {
  const consoleErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  page.on("pageerror", (error) => {
    consoleErrors.push(error.message);
  });

  return consoleErrors;
}
