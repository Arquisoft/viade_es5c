import 'jest';

import {
    defineFeature,
    loadFeature,
} from 'jest-cucumber';

const feature = loadFeature('./e2e/features/addFile.feature');
const puppeteer = require('puppeteer');
let browser = null;
let page = null;

defineFeature(feature, test => {

    beforeEach(async () => {
        jest.setTimeout(1200000);
    });

    test('Subir mi fichero ruta', ({ given, when,and, then }) => {

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

        when('subo una ruta', async () => {

            await page.goto("http://localhost:3000/#/routes/addFile", {
                waitUntil: 'networkidle2'
            });
        });

        and('relleno el formulario', async () => {

            await page.waitForSelector("[id='nombre']", {visible: true});
            await page.type("[id='nombre']", "Nombre ruta");
            await page.waitFor(500);

            await page.waitForSelector("[id='descripcion']", {visible: true});
            await page.type("[id='descripcion']", "Descripcion ruta", {visible: true});
            await page.waitFor(500);

            const inputMedia = await page.waitForSelector("[id='media']", {visible: true});
            await inputMedia.uploadFile('./test/imagen.jpg');
            await inputMedia.evaluate(upload => upload.dispatchEvent(new Event('change', { bubbles: true })));
            await page.waitFor(500);

            const inputFile = await page.waitForSelector("[id='file']", {visible: true});
            await inputFile.uploadFile('./test/parser/fichero_prueba_geojson.geojson');
            await inputFile.evaluate(upload => upload.dispatchEvent(new Event('change', { bubbles: true })));
            await page.waitFor(500);

            await page.waitForSelector("[id='submitId']", {visible: true});
            await page.evaluate(() => {
                let btns = [...document.querySelectorAll("[id='submitId']")];
                btns.forEach(function (btn) {
                    btn.click();
                });
            });
        });

        then('nos redirige a la página de mis rutas', async () => {

            await page.waitForNavigation({
                waitUntil: 'networkidle2'
            });

            expect(page.url()).toBe("http://localhost:3000/#/routes/listRoutes");
            await browser.close();
        });
    });
});