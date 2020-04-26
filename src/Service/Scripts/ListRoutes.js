import data from "@solid/query-ldflex";
import FC from "solid-file-client";
import {fetchDocument} from "tripledoc";
import {schema, space} from "rdf-namespaces";
import Media from "../../entities/Media";
import Point from "../../entities/Point";
import Route from "../../entities/Route";

const auth = require('solid-auth-client');

export async function listRoutes() {
    const session = await auth.currentSession();
    const user = data[session.webId];
    const fc = new FC(auth);
    const profileDocument = await fetchDocument(user);
    const profile = profileDocument.getSubject(user);
    const storage = profile.getRef(space.storage);

    let folder;

    await fc.readFolder(storage + 'viade2Prueba1/routes').then((content) => {
        folder = content;
    }).catch(err => folder = null);

    let rutas = [];

    if (folder) {
        for (let i = 0; i < folder.files.length; i++) {
            let routeDocument;
            await fetchDocument(folder.files[i].url).then((content) => {
                routeDocument = content;
            }).catch(err => routeDocument = null);

            if (routeDocument != null) {
                const route = routeDocument.getSubject("http://example.org/myRoute");
                const points = route.getAllLocalSubjects('http://arquisoft.github.io/viadeSpec/point');
                const refs = route.getAllRefs('http://arquisoft.github.io/viadeSpec/hasMediaAttached');

                var medias = [];

                if (refs.length > 0) {
                    for (let i = 0; i < refs.length; i++) {
                        let ref = routeDocument.getSubject(refs[i]);
                        let fechaMedia = ref.getDateTime(schema.publishedDate);
                        let autor = data[ref.getRef(schema.author)];
                        let image = ref.getRef(schema.contentUrl);

                        medias.push(new Media(ref, autor, fechaMedia, image));
                    }
                }

                let pointsArray = [];
                points.forEach(point =>
                    pointsArray.push(new Point(point.getDecimal(schema.latitude), point.getDecimal(schema.longitude))));

                if (route.getString(schema.name) !== null) {
                    let ruta = new Route(route.getString(schema.name), pointsArray, route.getString(schema.description));
                    ruta.setWebId(folder.files[i].url);
                    ruta.setMedia(medias);
                    rutas.push(ruta);
                }
            }
        }
    }
    return rutas;
}