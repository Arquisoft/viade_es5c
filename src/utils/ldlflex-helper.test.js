import * as ldflex from "./ldflex-helper";
import { cleanup } from "react-testing-library";
import * as Toaster from "./toaster";

afterAll(cleanup);

describe.only("Ldflex", () => {
  it("renders without crashing", () => {
    ldflex.documentExists("prueba");
    ldflex.createDocument("prueba", "body");
  });

  test("the fetch fails with an error1", () => {
    return ldflex
        .createDoc("prueba", null)
        .catch(e => expect(e).toMatch("error"));
  });

  test("the fetch fails with an error2", () => {
    return ldflex
        .deleteFile("prueba", null)
        .catch(e => expect(e).toMatch("error"));
  });

  test("the fetch fails with an error3", () => {
    return ldflex
        .createDocument("prueba", null)
        .catch(e => expect(e).toMatch("error"));
  });

  test("the fetch fails with an error4", () => {
    return ldflex
        .createDocumentWithTurtle("prueba", null)
        .catch(e => expect(e).toMatch("error"));
  });

  test("the fetch fails with an error5", () => {
    return ldflex
        .getLinkedInbox("prueba")
        .catch(e => expect(e).toMatch("error"));
  });

  test("the fetch fails with an error6", () => {
    return ldflex
        .resourceExists("prueba")
        .catch(e => expect(e).toMatch(Toaster.errorToaster(e.message, "Error")));
  });

  test("documentExists is ok", () => {
    return ldflex.documentExists("prueba").then(data => {
      expect(data).toStrictEqual({ ok: true, status: 200 });
    });
  });

  test("createDocumentTurtle is ok", () => {
    return ldflex.createDocumentWithTurtle("prueba", null).then(data => {
      expect(data).toStrictEqual({ ok: true, status: 200 });
    });
  });

  test("calls", () => {
    expect(ldflex.documentExists("prueba")).toBeTruthy();
    expect(ldflex.createDoc("prueba", null)).toBeTruthy();
    expect(ldflex.deleteFile("prueba")).toBeTruthy();
    expect(ldflex.createDocument("prueba")).toBeTruthy();
    expect(ldflex.createDocumentWithTurtle("prueba")).toBeTruthy();
    expect(ldflex.createNonExistentDocument("prueba")).toBeTruthy();
    expect(ldflex.fetchLdflexDocument("prueba")).toBeTruthy();
    expect(ldflex.resourceExists("prueba")).toBeTruthy();
    expect(ldflex.discoverInbox("prueba")).toBeTruthy();
    expect(ldflex.getLinkedInbox("prueba")).toBeTruthy();
  });
});
