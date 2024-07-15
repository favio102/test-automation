import { Page } from "@playwright/test";

export default class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await this.navigateToLoginPage();
      await this.fillLoginForm(email, password);
      await this.submitLoginForm();
      await this.waitForLoginError();
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

  private async navigateToLoginPage(): Promise<void> {
    await this.page.goto("/", { waitUntil: "domcontentloaded" });
    console.log("Navigated to Unsplash homepage");
    await this.page.getByRole("link", { name: "Log in" }).click();
    console.log("Clicked on login link");
  }

  private async fillLoginForm(email: string, password: string): Promise<void> {
    await this.page.getByLabel("Email").fill(email);
    console.log("Filled email input");
    await this.page.getByLabel("PasswordForgot your password?").fill(password);
    console.log("Filled password input");
  }

  private async submitLoginForm(): Promise<void> {
    await this.page.getByRole("button", { name: "Login", exact: true }).click();
    console.log("Clicked on login submit button");
  }

  private async waitForLoginError(): Promise<void> {
    await this.page.waitForSelector('text="Invalid email or password."');
    console.log("Login attempt with invalid credentials confirmed.");
  }
}
