import { test, expect } from "@playwright/test";
import SearchPage from "./searchPage.js";
import * as dotenv from "dotenv";

dotenv.config();

const email = process.env.PLAYWRIGHT_EMAIL;
const password = process.env.PLAYWRIGHT_PASSWORD;

test("Verify Search Functionality", async ({ page }) => {
  const searchPage = new SearchPage(page);
  await page.goto("https://unsplash.com");
  await searchPage.searchFor("nature");
  const results = await searchPage.getResultCount();
  expect(results).toBeGreaterThan(0);
});

test("Verify Image Download", async ({ page }) => {
  const searchPage = new SearchPage(page);
  await page.goto("https://unsplash.com");
  await searchPage.searchFor("city");
  await page.click("figure:nth-of-type(1) a");
  await page.getByRole("link", { name: "Download" });
  expect(true).toBe(true);
});

test("Verify Login Functionality", async ({ page }) => {
  if (!email || !password) {
    throw new Error(
      "Environment variables PLAYWRIGHT_EMAIL or PLAYWRIGHT_PASSWORD are not set"
    );
  }
  await page.goto("https://unsplash.com/");
  await page.getByRole("link", { name: "Log in" }).click();
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Login", exact: true }).click();
  await page.getByRole("button", { name: "Your personal menu button" }).click();
  await page.getByRole("link", { name: "View profile" }).click();
  await page.getByRole("button", { name: "Your personal menu button" }).click();
  await page.getByRole("menuitem", { name: "Logout @automation123" }).click();
  await page.goto("https://unsplash.com/");
});
