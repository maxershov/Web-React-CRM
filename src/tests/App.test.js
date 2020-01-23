import puppeteer from 'puppeteer';
import "regenerator-runtime/runtime";
import { getIndexByCode, getDaysLeft } from '../App';
import myLocalHost from '../../host';


// puppeteer test
// let browser;
// let page;

// beforeAll(async () => {
//   browser = await puppeteer.launch({
//     headless: false
//   });
//   page = await browser.newPage();
//   await page.goto(myLocalHost.pagePath);
// });

// test("renders first link", async () => {
//   await page.waitForSelector("#root");

//   const headerFirstLink = await page.$eval("#root > nav > a:nth-child(1)", e => e.innerHTML);
//   expect(headerFirstLink).toBe(`Главная`);
// });

// afterAll(() => {
//   browser.close();
// });


// jest func tests

test('get index by code', () => {
  const index = getIndexByCode('111111');
  expect(index).toBe(0);
})

test('getDaysLeft with empty string', () => {
  const daysLeft = getDaysLeft("");
  expect(daysLeft).toBe("");
})


