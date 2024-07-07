import { test, expect } from "@playwright/test";
import SearchPage from "./utils/searchPage.js";
import * as dotenv from "dotenv";

dotenv.config();

// Test data for download functionality
const downloadTerms = ["city", "technology", "food"];

// Parameterized test for image download functionality
downloadTerms.forEach((searchTerm) => {
  test(`Verify Image Download - ${searchTerm}`, async ({ page }) => {
    const searchPage = new SearchPage(page);
    try {
      await page.goto("https://unsplash.com");
      console.log("Navigated to Unsplash homepage");

      await searchPage.searchFor(searchTerm);
      console.log(`Performed search for '${searchTerm}'`);

      await page.click("figure:nth-of-type(1) a");
      console.log("Clicked on the first search result");

      const downloadLink = await page.getByRole("link", { name: "Download" });
      console.log("Found download link");

      expect(downloadLink).not.toBeNull();
    } catch (error) {
      console.error(`Error during 'Verify Image Download' test for ${searchTerm}`, error);
      console.log("Page URL at failure: ", page.url());
      await page.screenshot({
        path: `screenshots/verify-image-download-${searchTerm}-failure.png`,
      });
      throw error;
    }
  });
});