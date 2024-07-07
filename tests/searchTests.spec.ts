import { test, expect } from "@playwright/test";
import SearchPage from "./utils/searchPage.js";
import * as dotenv from "dotenv";

dotenv.config();

// Test data for search functionality
const searchTerms = ["nature", "city", "animals"];

// Parameterized test for search functionality
searchTerms.forEach((searchTerm) => {
  test(`Verify Search Functionality - ${searchTerm}`, async ({ page }) => {
    const searchPage = new SearchPage(page);
    try {
      await page.goto("https://unsplash.com");
      console.log("Navigated to Unsplash homepage");

      await searchPage.searchFor(searchTerm);
      console.log(`Performed search for '${searchTerm}'`);

      const results = await searchPage.getResultCount();
      console.log(`Found ${results} results`);

      expect(results).toBeGreaterThan(0);
    } catch (error) {
      console.error(
        `Error during 'Verify Search Functionality' test with term '${searchTerm}'`,
        error
      );
      console.log("Page URL at failure: ", page.url());
      await page.screenshot({
        path: `screenshots/verify-search-functionality-${searchTerm}-failure.png`,
      });
      throw error;
    }
  });
});