
import { test as baseTest } from "@playwright/test";
import HomePage from "../pages/homePage.page";
const test = baseTest.extend<{
    homePage: HomePage;
}>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },


})
export default test;
export const expect = test.expect;

