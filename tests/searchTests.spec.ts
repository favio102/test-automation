import { test, expect } from "@playwright/test";
import SearchPage from "./utils/searchPage.js";
import * as dotenv from "dotenv";
import testData from './tests.json';

dotenv.config();

// Parameterized test for search functionality
testData.searchTerms.forEach((searchTerm: string) => {
  test(`Verify Search Functionality - ${searchTerm}`, async ({ page }) => {
    const searchPage = new SearchPage(page);
    try {
      await page.goto("/");
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
