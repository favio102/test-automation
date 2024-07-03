class LoginPage {
    constructor(page) {
      this.page = page;
    }
  
    async login(email, password) {
      await this.page.goto("https://unsplash.com/");
      await this.page.getByRole("link", { name: "Log in" }).click();
      await this.page.getByLabel("Email").fill(email);
      await this.page.getByLabel("Password").fill(password);
      await this.page.getByRole("button", { name: "Login", exact: true }).click();
    }
  }
  
  module.exports = LoginPage;