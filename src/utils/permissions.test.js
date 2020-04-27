import * as permission from "./permissions";
import { cleanup } from "react-testing-library";
import * as Toaster from "./toaster";

afterAll(cleanup);

describe.only("Permsissions", () => {

    test('toaster', () => {
        permission.checkOrSetInboxAppendPermissions(null, "https://viadees5c.solid.community/profile/card#me");
        expect(Toaster.successToaster()).toHaveBeenCalled();
    });

});