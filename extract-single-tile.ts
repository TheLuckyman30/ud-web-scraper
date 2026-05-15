import * as cheerio from "cheerio";
import { ContactInfo, ContactMethod, Resource } from "./interfaces";
import { BASE_URL } from "./constants";

export function extarctSingleTile($: cheerio.CheerioAPI, category: string) {
  const title = $("sd-detail-header").find("h2").text() || "Not Provided";
  const subtitle =
    $("sd-detail-header").find("span#detailpage_application").text() ||
    "Not Provided";
  const description =
    $("sd-detail-header").find("span#detailpage_description").text() ||
    "Not Provided";
  const audience =
    $(
      "sd-detail-header > sd-section > section > div > div > div >  div > span",
    ).text() || "For all roles";
  const link = $("sd-detail-header").find("a").attr("href") ?? "";

  const contactOffice = $("sd-contact").find("h3").text() || "Not Provided";

  const contactMethods: ContactMethod[] = [];
  $("sd-contact")
    .find("ul")
    .find("li")
    .each((_, element) => {
      const label = $(element).text();
      const url = $(element).find("a").attr("href") ?? "";
      contactMethods.push({ label, url });
    });

  const contactInfo: ContactInfo = { contactOffice, contactMethods };

  const contactString = `Office: ${contactInfo.contactOffice}\nMethods:\n${contactMethods.map((method) => `Label: ${method.label}, URL: ${method.url}`).join("\n")}`;

  const resource: Resource = {
    category,
    title,
    subtitle,
    description,
    audience,
    contactInfo: contactString,
    link: `${BASE_URL}/${link}`,
  };

  return resource;
}
