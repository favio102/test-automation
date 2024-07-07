import { test, expect } from "@playwright/test";
import LoginPage from './utils/loginPage.ts'

test.describe("Login Tests", () => {
  test("Verify Login Functionality - invalid@example.com", async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Using invalid credentials
    const email = "invalid@example.com";
    const password = "invalidpassword";

    try {
      await loginPage.login(email, password);
    } catch (error) {
      console.error("Error during 'Verify Login Functionality' test", error);
      console.log("Page URL at failure: ", page.url());
      await page.screenshot({
        path: `screenshots/verify-login-functionality-${email}-failure.png`,
      });
      throw error;
    }
  });
});
