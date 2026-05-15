import { Page } from "puppeteer";
import { findCats } from "./find-cats";

export async function naviagteToCat(page: Page, index: number) {
  const buttons = await findCats(page);

  await buttons[index].click();

  console.log(
    await buttons[index].evaluate((el) => el.textContent.trimStart().trimEnd()),
    index,
  );

  try {
    await page.waitForSelector('espd-message[key="button.seeMore"]', {
      timeout: 10000,
    });
  } catch {
    console.log("Could not find a see more button!");
  }
}
