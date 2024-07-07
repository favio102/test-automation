import { Page } from "@playwright/test";

export default class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await this.page.goto("https://unsplash.com/");
      console.log("Navigated to Unsplash homepage");

      await this.page.getByRole("link", { name: "Log in" }).click();
      console.log("Clicked on login link");

      await this.page.getByLabel("Email").fill(email);
      console.log("Filled email input");

      await this.page
        .getByLabel("PasswordForgot your password?")
        .fill(password);
      console.log("Filled password input");

      await this.page
        .getByRole("button", { name: "Login", exact: true })
        .click();
      console.log("Clicked on login submit button");

      // Wait for the error message indicating invalid credentials
      await this.page.waitForSelector('text="Invalid email or password."');
      console.log("Login attempt with invalid credentials confirmed.");
    } catch (error) {
      console.error("Error during login", error);
      if (!this.page.isClosed()) {
        console.log("Page URL at failure: ", this.page.url());
        await this.page
          .screenshot({ path: `screenshots/login-failure.png` })
          .catch((screenshotError) => {
            console.error("Error capturing screenshot:", screenshotError);
          });
      }
      throw error;
    }
  }
}