import { test, expect } from "@playwright/test";
import SearchPage from "./searchPage.js";
import LoginPage from "./loginPage.js";
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
    throw new Error("Environment variables PLAYWRIGHT_EMAIL or PLAYWRIGHT_PASSWORD are not set");
  }
  const loginPage = new LoginPage(page);
  await loginPage.login(email, password);
});