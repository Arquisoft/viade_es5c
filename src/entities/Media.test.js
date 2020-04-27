import Media from "./Media";
import React from "react";

const media1 = new Media('', 'autor1',1, 'image');
const media3 = new Media();

describe.only('Create a new Media', () => {

    test('create succesfully', () => {
        expect(media1.getComponent()).toMatchObject (<img className="d-block route-img" alt="autor1" />);
    });

    test('change properties', () => {
        media1.type = "video";
        expect(media1.getComponent()).toMatchObject(<video controls className="d-block route-img"/>);
    });
});

describe.only('media undefined', () => {
    test('comprobando tipos undefined', () => {
        expect(media3.getUrl()).toBe(undefined);
        expect(media3.getComponent()).toBe(undefined);
    });
});