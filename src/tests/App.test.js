import puppeteer from 'puppeteer';
import "regenerator-runtime/runtime";
import {getIndexByCode, getDaysLeft} from '../App';
import myLocalHost from '../../host';

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false
    });
    page = await browser.newPage();
    await page.goto(myLocalHost.pagePath);
  });
  
  test("renders first link", async () => {
    await page.waitForSelector("#root");
  
    const headerFirstLink = await page.$eval("#root > nav > a:nth-child(1)", e => e.innerHTML);
    expect(headerFirstLink).toBe(`Главная`);
  });
  

  afterAll(() => {
    browser.close();
  });

test('get index by code', () => {
    const index = getIndexByCode('111111');
    expect(index).toBe(0);
})

test('getDaysLeft with null', () => {
    const daysLeft = getDaysLeft(null);
    expect(daysLeft).toBe(null);
})