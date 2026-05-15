# MyUD Scraper

A scraper that extracts university resource information from **MyUD** and exports the data into a structured CSV file for easier analysis, searching, and organization.

## Features
- Scrapes resource information from MyUD
- Extracts
  - Title
  - Subtitle/Application
  - Description
  - Audience
  - Contact information
  - Resource link
- Exports data into a CSV format

## Installation
Clone the repository:

```
git clone https://github.com/TheLuckyman30/ud-web-scraper.git
cd ud-web-scraper
```

Install dependencies:
```
npm install
```
## Usage
Run the scraper:
```
npm run dev
```
\
A chrome tab will open to the MyUD website and you will be shown the following terminal interface:
```
1. Extract info from category
2. Generate csv with current info
3. Exit
```

- To extract info from a category, you must:
  - Navigate to the category you want to scrape on the tab that just opened up
  - Press 1 as your answer to the above prompt
  - This will initiate the scraping process where the scraper will expand all the resoures first, and then it will proceed to extract the information
  - The extracted info will then get stored in the ```allResources``` array that is present in ```main.ts```
  - All extracted info is saved and stored until you stop the program. So you can extract other categories without overwriting previous data.
- To generate a CSV file
  - Press 2 as your answer to the above prompt
  - This will generate a csv file using the resources stored in the ```allResources``` array

## Extraction Process
The web scraper extracts the information as follows:
- Expands all the resources on the category page
- Opens 50 resources at a time (this number is adjustable)
- Extracts information from each opened resource (e.g. tile, description, contatcs, links)
- Repeats this proccess until there are no more resources on the page
- After the process is done, the resources get stored in the ```allResources``` array

## CSV Structure
- category &rarr; The name of the category that resource exists under
- title &rarr; The name of the resource
- subtitle &rarr; The secondary name/title of the resource
- description &rarr; The given resource description
- audience &rarr; The intended audience for the resource
- contactInfo &rarr; All the various contacts and academic offices related to the resource
- link &arr; The link to the resource

## Disclaimer
This scraper was created for academic/research purposes and only accesses data available through the authenticated MyUD interface.
