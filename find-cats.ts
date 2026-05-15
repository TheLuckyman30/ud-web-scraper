import { Page } from "puppeteer";
import { BASE_URL } from "./constants";
import { sleep } from "./sleep";

export async function findCats(page: Page) {
  await page.goto(BASE_URL, {
    waitUntil: "networkidle2",
  });

  try {
    await page.locator('button[title="Categories"]').click();
  } catch {
    console.log("Could not find categories button!");
  }

  await page.waitForSelector("div.modal-body");
  const buttons = await page.$$("div.modal-body button");

  return buttons;
}
