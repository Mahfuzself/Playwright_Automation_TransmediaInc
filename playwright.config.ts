import { defineConfig,devices } from "@playwright/test";
import ENV from "./utils/env";
export default defineConfig({
  // testDir: './tests',
  testMatch: [
    "homePage.test.ts",
    ],
  timeout: 1 * 30 * 100000,
  expect: {
  
    timeout: 40000,

    toHaveScreenshot: {
      maxDiffPixels: 10,
    },

    toMatchSnapshot: {
          maxDiffPixelRatio: 0.50,
    },
  },

  fullyParallel: !true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
 
  workers: process.env.CI ? 1 : 1,

  // reporter: process.env.CI ? [["junit", {
  //   outputFile: "results.xml"
  // }]] : [["json", {
  //   outputFile: "report.json"
  // }], ["html", {
  //   open: "never"
  // }]],

  reporter: [
    [
      "html",
      {
        open: "never",
      },
    ],
  ],

  use: {
  
    actionTimeout: 10 * 6000,
    navigationTimeout: 30 * 7000,
    baseURL: ENV.BASE_URL,
    launchOptions: {
      slowMo: 20,
    },
    permissions: ["microphone", "camera", "clipboard-read", "clipboard-write"],
    browserName: "chromium",
    channel: "chrome",
    headless: false,
    viewport: { width: 1700, height: 920 },
    ignoreHTTPSErrors: true,
  
    // trace: process.env.CI ? "off" : "retain-on-failure",
    // video: process.env.CI ? "off" : "off",
    // screenshot: process.env.CI ? "on" : "on",
  },



});
