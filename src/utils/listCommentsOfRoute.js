import { schema } from "rdf-namespaces"
import { fetchDocument } from "tripledoc"
import { findRouteURL } from "./helpers/routeHelper"
import { getPersonaByWebId } from "./helpers/personHelper"

import Comentario from "../entities/Comentario.js"

const auth = require("solid-auth-client")

export async function listCommentsOfRoute (routeUUID, authorWebId) {
  var result = []
  let session = null
  session = await auth.currentSession()

  if (!session) {
    window.location.href = "/login"
  }

  let url = await findRouteURL(authorWebId == null ? session.webId : authorWebId, routeUUID)
  // Si la encuentro entonces busco los comentarios
  if (url !== null) {
    const routeDoc = await fetchDocument(url)
    const comentarios = routeDoc.getSubjectsOfType(
      "http://arquisoft.github.io/viadeSpec/userComment"
    )
    for (var i = 0; i < comentarios.length; i++) {
      const comentario = new Comentario(
        comentarios[i].getDateTime(schema.datePublished),
        comentarios[i].getString(schema.text)
      )
      const autor = await getPersonaByWebId(comentarios[i].getRef(schema.author))
      comentario.setAutor(autor)
      result = [...result, comentario]
    }
  }
  return result
}