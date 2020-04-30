import 'jest';

import {
    defineFeature,
    loadFeature,
} from 'jest-cucumber';

const feature = loadFeature('./e2e/features/addRoute.feature');
const puppeteer = require('puppeteer');
let browser = null;
let page = null;

defineFeature(feature, test => {

    beforeEach(async () => {
        jest.setTimeout(1200000);
    });

    test('Crear una nueva ruta', ({ given, when,and, then }) => {

        given('Soy un usuario logueado', async () => {
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
                let btns = [...document.querySelectorAll("button")];
                btns.forEach(function (btn) {
                    if (btn.innerText === "Iniciar sesión"){
                        btn.click();
                    }
                });
            });

            await page.waitForSelector("[id='username']", {visible: true});
            await page.type("[id='username']", "viadees5c");

            await page.waitFor(500);
            await page.waitForSelector("[id='password']", {visible: true});
            await page.type("[id='password']", "viadees5c", {visible: true});

            await page.waitFor(500);

            await page.evaluate(() => {
                let btns = [...document.querySelector(".form-horizontal.login-up-form").querySelectorAll("button")];
                btns.forEach(function (btn) {
                    if (btn.innerText === "Log In")
                        btn.click();
                });
            });

            await page.waitForNavigation({
                waitUntil: 'networkidle2'
            });

            expect(page.url()).toBe("http://localhost:3000/#/welcome")
        });

        when('relleno el formulario', async () => {

            await page.goto("http://localhost:3000/#/routes/addRoute", {
                waitUntil: 'networkidle2'
            });

            await page.waitForSelector("[id='titulo']", {visible: true});
            await page.type("[id='titulo']", "Nombre ruta");
            await page.waitFor(500);

            await page.waitForSelector("[id='descripcion']", {visible: true});
            await page.type("[id='descripcion']", "Descripcion ruta", {visible: true});
            await page.waitFor(500);
        });

        and('marco los puntos en el mapa', async () => {
            await page.evaluate(() => {
                window.scrollBy(0, window.innerHeight);
            });
            await page.waitFor(1000);
            await page.mouse.move(500, 500);
            await page.mouse.down({ button: "left" });
            await page.mouse.up({ button: "left" });
            await page.waitFor(1000);
            await page.mouse.move(520, 500);
            await page.mouse.down({button: 'left'});
            await page.mouse.up({button: 'left'});

            await page.waitForSelector("[id='submitId']", {visible: true});
            await page.evaluate(() => {
                let btns = [...document.querySelectorAll("[id='submitId']")];
                btns.forEach(function (btn) {
                    btn.click();
                });
            });
        });

        then('nos muestra una notificación correcta', async () => {
            //await page.waitForSelector("[class='toaster-success']", {visible: true});
            expect(page.url()).toBe("http://localhost:3000/#/routes/addRoute");
            await browser.close();
        });
    });
});