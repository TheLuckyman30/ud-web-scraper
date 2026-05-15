import * as cheerio from "cheerio";
import { Browser, Page } from "puppeteer";
import { BASE_URL, MAX_PAGES } from "./constants";
import { extarctSingleTile } from "./extract-single-tile";
import { Resource } from "./interfaces";

export async function extractAllTiles(page: Page, browser: Browser) {
  const links: string[][] = [];
  const pageHTML = await page.content();
  const $ = cheerio.load(pageHTML);

  const category = $("sd-store-home h2")
    .text()
    .split(":")[0]
    .trimStart()
    .trimEnd();

  console.log(`Extracting information from ${category}`);

  const infoButtons = $("sd-store-home")
    .find("sd-tile")
    .find("a.circle-button");

  let newLinks: string[] = [];
  infoButtons.each((index, element) => {
    let link = $(element).attr("href");
    if (link && link.startsWith("/")) {
      link = BASE_URL + link;
      newLinks.push(link);

      if (
        (index !== 0 && index % MAX_PAGES === 0) ||
        index === infoButtons.length - 1
      ) {
        links.push(newLinks);
        newLinks = [];
      }
    }
  });

  const newResources: Resource[] = [];
  const linksLength = links.flat().length;
  let count = 0;
  for (const linkGroup of links) {
    await Promise.all(
      linkGroup.map(async (link) => {
        const newPage = await browser.newPage();
        await newPage.goto(link, {
          waitUntil: "networkidle2",
        });
        const mewPageHTML = await newPage.content();
        const new$ = cheerio.load(mewPageHTML);
        const newResource = extarctSingleTile(new$, category);
        newResources.push(newResource);
        await newPage.close();
        count++;
        console.log(`Finished [${count}/${linksLength}]`);
      }),
    );
  }

  return [category, newResources] as const;
}
