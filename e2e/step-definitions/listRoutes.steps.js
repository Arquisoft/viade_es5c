import 'jest'
import { defineFeature, loadFeature } from 'jest-cucumber';

const feature = loadFeature('./e2e/features/listRoutes.feature');
const puppeteer = require('puppeteer');
let browser = null;
let page = null;

defineFeature(feature, test => {

    beforeEach(async () => {
        jest.setTimeout(1200000);
    });

    test('List my routes at pod', ({ given, when, then }) => {

        given('A user in session', async () => {
            browser = await puppeteer.launch({
                headless: false
            });

            page = await browser.newPage();
            await page.goto("http://localhost:3000/#/login", {
                waitUntil: 'networkidle2'
            });


            await page.waitForSelector(".sc-EHOje.cffgrt");
            await page.type(".sc-EHOje.cffgrt", "https://viadees5c.solid.community/profile/card#me");

            await page.evaluate(() => {
                let buttons = [...document.querySelectorAll("button")];
                buttons.forEach(function (btn) {
                    if (btn.innerText === "Iniciar sesión")
                        btn.click();
                });
            });

            await page.waitForNavigation({
                waitUntil: 'networkidle2'
            });

            await page.waitForSelector("[id='username']", {visible: true});
            await page.type("[id='username']", "viadees5c");
            await page.waitFor(500);
            await page.waitForSelector("[id='password']", {visible: true});
            await page.type("[id='password']", "viadees5c", {visible: true});
            await page.waitFor(500);

            await page.evaluate(() => {
                let buttons = [...document.querySelector(".form-horizontal.login-up-form").querySelectorAll("button")];
                buttons.forEach(function (btn) {
                    if (btn.innerText === "Log In")
                        btn.click();
                });
            });
            await page.waitForNavigation({
                waitUntil: 'networkidle2'
            });
            expect(page.url()).toBe("http://localhost:3000/#/welcome")
        });

        when('i list my routes', async () => {
            await page.goto("http://localhost:3000/#/routes/listRoutes", {
                waitUntil: 'networkidle2'
            });
        });

        then('i see my routes', async () => {
            await page.waitFor(500);
            await page.waitForSelector("[id='verRuta']", {visible: true});
        });
    });
});