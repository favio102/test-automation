class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async login(email, password) {
    try {
      await this.page.goto("https://unsplash.com/");
      console.log("Navigated to Unsplash homepage");

      await this.page.getByRole("link", { name: "Log in" }).click();
      console.log("Clicked on 'Log in' link");

      await this.page.getByLabel("Email").fill(email);
      console.log("Filled in email");

      await this.page.getByLabel("Password").fill(password);
      console.log("Filled in password");

      await this.page
        .getByRole("button", { name: "Login", exact: true })
        .click();
      console.log("Clicked on 'Login' button");
    } catch (error) {
      console.error("Error during login", error);
      throw error;
    }
  }
}

module.exports = LoginPage;