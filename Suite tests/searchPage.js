class SearchPage {
  constructor(page) {
    this.page = page;
  }

  async searchFor(searchTerm) {
    try {
      await this.page.fill('input[type="search"]', searchTerm);
      console.log(`Filled in search term: ${searchTerm}`);

      await this.page.press('input[type="search"]', "Enter");
      console.log("Pressed Enter to search");
    } catch (error) {
      console.error("Error during search", error);
      throw error;
    }
  }

  async getResultCount() {
    try {
      const resultElements = await this.page.locator("figure");
      const count = await resultElements.count();
      console.log(`Found ${count} result elements`);
      return count;
    } catch (error) {
      console.error("Error getting result count", error);
      throw error;
    }
  }
}

module.exports = SearchPage;
