import { Page } from "puppeteer";
import { sleep } from "./sleep";

export async function expandOptions(page: Page) {
  let loaded = true;

  while (loaded) {
    try {
      await page
        .locator('espd-message[key="button.seeMore"]')
        .setTimeout(3000)
        .click();
      await sleep(500);
    } catch {
      console.log("Double checking that there are no more buttons!");
      try {
        await page.waitForSelector('espd-message[key="button.seeMore"]', {
          timeout: 3000,
        });
        console.log("Found another button!");
      } catch {
        loaded = false;
        console.log("All buttons have been expanded!\n");
      }
    }
  }
}
