import { schema } from "rdf-namespaces"
import { fetchDocument } from "tripledoc"
import { findRouteURL } from "./helpers/routeHelper"

const auth = require("solid-auth-client")

export async function listMediaOfRoute (routeUUID, authorWebId) {
  var result = []
  let session = null
  session = await auth.currentSession()

  if (!session) {
    window.location.href = "/login"
  }

  let url = await findRouteURL(authorWebId == null ? session.webId : authorWebId, routeUUID)
  // Si la encuentro entonces busco los ficheros
  if (url !== null) {
    const routeDoc = await fetchDocument(url)
    const ficheros = routeDoc.getSubjectsOfType(schema.MediaObject)
    for (var i = 0; i < ficheros.length; i++) {
      const fichero = ficheros[i].getRef(schema.contentUrl)
      result = [...result, fichero]
    }
  }
  return result
}