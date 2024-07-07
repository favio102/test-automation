import { test, expect } from "@playwright/test";
import SearchPage from "./searchPage.js";
import LoginPage from "./loginPage.js";
import * as dotenv from "dotenv";

dotenv.config();

const email = process.env.PLAYWRIGHT_EMAIL;
const password = process.env.PLAYWRIGHT_PASSWORD;

test("Verify Search Functionality", async ({ page }) => {
  const searchPage = new SearchPage(page);
  try {
    await page.goto("https://unsplash.com");
    console.log("Navigated to Unsplash homepage");

    await searchPage.searchFor("nature");
    console.log("Performed search for 'nature'");

    const results = await searchPage.getResultCount();
    console.log(`Found ${results} results`);

    expect(results).toBeGreaterThan(0);
  } catch (error) {
    console.error("Error during 'Verify Search Functionality' test", error);
    console.log("Page URL at failure: ", page.url());
    await page.screenshot({
      path: `screenshots/verify-search-functionality-failure.png`,
    });
    throw error;
  }
});

test("Verify Image Download", async ({ page }) => {
  const searchPage = new SearchPage(page);
  try {
    await page.goto("https://unsplash.com");
    console.log("Navigated to Unsplash homepage");

    await searchPage.searchFor("city");
    console.log("Performed search for 'city'");

    await page.click("figure:nth-of-type(1) a");
    console.log("Clicked on the first search result");

    const downloadLink = await page.getByRole("link", { name: "Download" });
    console.log("Found download link");

    expect(downloadLink).not.toBeNull();
  } catch (error) {
    console.error("Error during 'Verify Image Download' test", error);
    console.log("Page URL at failure: ", page.url());
    await page.screenshot({
      path: `screenshots/verify-image-download-failure.png`,
    });
    throw error;
  }
});

test("Verify Login Functionality", async ({ page }) => {
  if (!email || !password) {
    throw new Error(
      "Environment variables PLAYWRIGHT_EMAIL or PLAYWRIGHT_PASSWORD are not set"
    );
  }

  const loginPage = new LoginPage(page);
  try {
    await loginPage.login(email, password);
    console.log("Performed login");
  } catch (error) {
    console.error("Error during 'Verify Login Functionality' test", error);
    console.log("Page URL at failure: ", page.url());
    await page.screenshot({
      path: `screenshots/verify-login-functionality-failure.png`,
    });
    throw error;
  }
});