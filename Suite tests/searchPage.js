class SearchPage {
  constructor(page) {
    this.page = page;
  }

  async searchFor(searchTerm) {
    await this.page.fill('input[type="search"]', searchTerm);
    await this.page.press('input[type="search"]', "Enter");
  }

  async getResultCount() {
    const resultElements = await this.page.locator("figure");
    return await resultElements.count();
  }
}

module.exports = SearchPage;
