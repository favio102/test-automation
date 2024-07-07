import { Page } from "@playwright/test";

export default class SearchPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async searchFor(searchTerm: string): Promise<void> {
    try {
      await this.page.fill('input[type="search"]', searchTerm);
      console.log(`Filled search input with term: '${searchTerm}'`);

      await this.page.press('input[type="search"]', "Enter");
      console.log("Pressed Enter key");
    } catch (error) {
      console.error("Error during search", error);
      console.log("Page URL at failure: ", this.page.url());
      await this.page.screenshot({
        path: `screenshots/search-${searchTerm}-failure.png`,
      });
      throw error;
    }
  }

  async getResultCount(): Promise<number> {
    try {
      const resultElements = await this.page.locator("figure");
      const count = await resultElements.count();
      console.log(`Found ${count} search results`);
      return count;
    } catch (error) {
      console.error("Error getting search results count", error);
      console.log("Page URL at failure: ", this.page.url());
      await this.page.screenshot({
        path: `screenshots/search-results-count-failure.png`,
      });
      throw error;
    }
  }
}
