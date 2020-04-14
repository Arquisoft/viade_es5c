import { schema } from "rdf-namespaces"
import { fetchDocument } from "tripledoc"
import { existsFileInFolder, getRootStorage } from "../helpers/fileHelper"
import { getPersonaByWebId } from "../helpers/personHelper"
import { AccessControlList } from "@inrupt/solid-react-components"
import Ruta from "../../../front-end/model/Ruta.js"
import Comentario from "../../../front-end/model/Comentario.js"

export async function readRouteFromUrl (url) {
  let routeDoc
  let ruta = null
  await fetchDocument(url)
    .then(content => {
      routeDoc = content
    })
    .catch(err => (routeDoc = null))

  if (routeDoc != null) {
    try {
      const route = routeDoc.getSubject("#ruta")

      var puntos = routeDoc.getSubjectsOfType(
        "http://arquisoft.github.io/viadeSpec/points"
      )
      ruta = new Ruta(
        route.getString(schema.name),
        [
          puntos[0].getDecimal(schema.latitude),
          puntos[0].getDecimal(schema.longitude)
        ],
        route.getString(schema.description)
      )
      ruta.setUUID(route.getString(schema.identifier))
      
      var hitos=[]

      for (var e = 1; e < puntos.length; e++) {
        console.log(puntos[e].getInteger("http://arquisoft.github.io/viadeSpec/order"))
        hitos.push(
            {
              nombre: puntos[e].getString(schema.name),
              latitud: puntos[e].getDecimal(schema.latitude),
              longitud: puntos[e].getDecimal(schema.longitude),
              orden: puntos[e].getInteger("http://arquisoft.github.io/viadeSpec/order")
            }
          )
      }

      console.log("Sin ordenar "+hitos)
      //Ordenamos los puntos
      hitos = hitos.sort(sortByOrder)

      console.log("Ordenado "+hitos)

      ruta.setHitos(hitos)


      const comentarios = routeDoc.getSubjectsOfType(
        "http://arquisoft.github.io/viadeSpec/userComment"
      )
      for (let i = 0; i < comentarios.length; i++) {
        const comentario = new Comentario(comentarios[i].getDateTime(schema.datePublished), comentarios[i].getString(schema.text))
        const autor = await getPersonaByWebId(comentarios[i].getRef(schema.author))
        comentario.setAutor(autor)
        ruta.addComentario(comentario)
      }
      const ficheros = routeDoc.getSubjectsOfType(schema.MediaObject)
      for (let i = 0; i < ficheros.length; i++) {
        const fichero = ficheros[i].getRef(schema.contentUrl)
        ruta.addFichero(fichero)
      }
    } catch (error) {
      console.log(error)
      return null
    }
  }
  return ruta
}
function sortByOrder(a, b) {
  return a.orden - b.orden;
}
export async function findRouteURL (authorWebId, uuid) {
  const storage = await getRootStorage(authorWebId)
  let routeDoc
  let routeURL = null
  await fetchDocument(storage + "private/viade_es5b/routes/" + uuid + ".ttl").then((content) => {
    routeDoc = content
  })
    .catch(err => routeDoc = null)

  if (routeDoc != null) {
    var route = routeDoc.getSubject("#ruta")
    var ID = route.getString(schema.identifier)
    if (ID === uuid) {
      routeURL = storage + "private/viade_es5b/routes/" + uuid + ".ttl"
    }
  }
  return routeURL;
}
export async function getSharedRouteFriends (storage, routeUUID) {
  var result = []
  var exists = await existsFileInFolder(storage + "private/viade_es5b", "mySharedRoutes.ttl")
  if (exists) {
    const mySharedRoutesDocument = await fetchDocument(storage + "private/viade_es5b/mySharedRoutes.ttl")

    const rutas = mySharedRoutesDocument.getAllSubjectsOfType("http://arquisoft.github.io/viadeSpec/route")
    for (var e = 0; e < rutas.length; e++) {
      // Miro a ver si estoy compartiendo esta ruta
      if (rutas[e].getLiteral(schema.identifier) === routeUUID) {
        // Si la estoy compartiendo entonces saco los amigos con los que la comparto
        const amigos = rutas[e].getAllRefs(schema.agent)
        for (var i = 0; i < amigos.length; i++) {
          // los añado a result
          //elimino simbolos redundantes como doble barra (darian problemas para permisos)
          let amigo = amigos[i].replace(/([^:]\/)\/+/g, "$1")
          result = [...result, amigo]
        }
        // Ya encontre lo que busco asi que salgo
        break
      }
    }
  }
  return result
}
//Actualizo los permisos de la ruta
export async function updateRoutePermissions(webId,routeUUID)
{
  var storage =  await getRootStorage(webId);

  //Busco con quien la tengo compartida y actualizo los permisos
  var friends = await getSharedRouteFriends(storage,routeUUID)
  var filePath=storage + "private/viade_es5b/routes/" + routeUUID + ".ttl";

    try {
      //Permisos a añadir
      const permissions = [
        {
          agents: friends,
          modes: [AccessControlList.MODES.APPEND,AccessControlList.MODES.READ]
        }
      ];
      //Si existe el fichero lo sobrescribe
        const ACLFile = new AccessControlList(webId,filePath,filePath + '.acl');
          await ACLFile.createACL(permissions);
      } catch (error) {
        console.log(error)
        return false
      }
      return true;
}