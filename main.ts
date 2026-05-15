import puppeteer from "puppeteer";
import * as readline from "node:readline";
import { BASE_URL } from "./constants";
import { extractAllTiles } from "./extract-all-tiles";
import ObjectsToCsv from "objects-to-csv";
import { expandOptions } from "./expand-options";
import { Resource } from "./interfaces";

async function main() {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  await page.goto(BASE_URL, {
    waitUntil: "networkidle2",
  });

  const question =
    "1. Extract info from category\n" +
    "2. Generate csv with current info\n" +
    "3. Exit\n";

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // const categories = await findCats(page);
  // const names = await Promise.all(
  //   categories.map((cat) =>
  //     cat.evaluate((el) => el.textContent.trimStart().trimEnd()),
  //   ),
  // );
  // console.log("These are the available categories.");
  // console.log(names);

  const allResources: Resource[][] = [];
  let exit = false;
  while (!exit) {
    const respone = await new Promise((resolve) => {
      rl.question(question, resolve);
    });
    const selectedOption = Number(respone);

    switch (selectedOption) {
      case 1:
        await expandOptions(page);
        const [categroy, resources] = await extractAllTiles(page, browser);
        allResources.push(resources);
        console.log(`Finished process for ${categroy}!\n`);
        break;
      case 2:
        const csv = new ObjectsToCsv(allResources.flat());
        csv.toDisk(`./data.csv`);
        break;
      case 3:
        exit = true;
        break;
      default:
        console.log("Pick one of the options above!\n");
    }
  }
  rl.close();
  await page.close();
  await browser.close();
}

main();
