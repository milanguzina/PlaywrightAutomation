// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 30*1000,
  expect : {
    timeout: 5000,
  },
  reporter: 'html',

  use: { 
    browserName: 'chromium',
    screenhot: 'on',
    //traces only on failed tests ->
    screenshot: 'retain-on-failure',
    //traces on all tests - Passed and Failed -> trace: 'on',
   // headless: false,
    

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

   },

});

module.exports = config;