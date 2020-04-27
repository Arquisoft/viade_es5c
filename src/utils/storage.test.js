import * as storage from "./storage";
import { cleanup } from "react-testing-library";
import * as Toaster from "./toaster";

afterAll(cleanup);

describe.only("Storage", () => {

    test('calls', () => {
        expect(storage.getAppStorage("prueba", "path")).toBeTruthy();
        expect(storage.buildPathFromWebId("https://viadees5c.solid.community/profile/card#me", "path")).toBeTruthy();
        expect(storage.createInitialFiles("https://viadees5c.solid.community/profile/card#me")).toBeTruthy();
    });

    test('fails with an error', () => {
        return storage.createInitialFiles("https://viadees5c.solid.community/profile/card#me").catch(e => expect(e).toMatch( Toaster.errorToaster(e.message, "Error")));

    });

    test('buildPath is ok', () => {
        expect(storage.buildPathFromWebId("https://viadees5c.solid.community/profile/card#me", "path"))
            .toStrictEqual('https://viadees5c.solid.community/path');
    });

    test('toaster', () => {
        storage.createInitialFiles("https://viadees5c.solid.community/profile/card#me");
        expect(Toaster.errorToaster()).toHaveBeenCalled();
    });

});