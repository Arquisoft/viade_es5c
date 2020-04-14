import { rdf, schema } from "rdf-namespaces"
import { fetchDocument } from "tripledoc"
import { findRouteURL, getSharedRouteFriends } from "./helpers/routeHelper"
import { getRootStorage } from "./helpers/fileHelper"
import { sendNotificationBody } from "./helpers/notificationHelper"

const auth = require("solid-auth-client")

// Devuelve true puedo insertar el comentario
export async function addCommentToRoute (comentario, routeUUID, routeOwnerWebID) {
  var result = false
  const session = await auth.currentSession()
  if (!session) { window.location.href = "/login" }
  const webId = session.webId
  if(routeOwnerWebID === null) routeOwnerWebID = webId

  const storage = await getRootStorage(routeOwnerWebID)

  let url = await findRouteURL(routeOwnerWebID, routeUUID)
  // Si la encuentro entonces inserto el comentario y notifico al dueño de la ruta
  if (url !== null) {
    result = await insertData(comentario, url, webId)
    if (result) {
      //Si soy el dueño de la ruta mando un comentario a todos
      if(webId === routeOwnerWebID) {
        // Busco a que amigos mandar la circular y las mando
        var friends = await getSharedRouteFriends(storage, routeUUID)
        for (let i = 0; i < friends.length; i++) {
          await sendCommentNotification(webId, friends[i], url, comentario)
        }
      }
      //sino le mando un mensaje al dueño de la ruta
      else {
      await sendCommentNotification(webId, routeOwnerWebID, url, comentario)
      console.log(routeUUID + " comentario añadido")
      }
    }
  }
  return result
}

async function insertData (comentario, routeUrl, myWebId) {
  const routeDocument = await fetchDocument(routeUrl)
  // Initialise the new Subject:
  const newComment = routeDocument.addSubject()

  newComment.addString(schema.text, comentario.getTexto())
  newComment.addDateTime(schema.datePublished, comentario.getFecha())
  newComment.addRef(schema.author, myWebId)
  newComment.addRef(rdf.type, "http://arquisoft.github.io/viadeSpec/userComment")

  const success = await routeDocument.save([newComment])
  return (success !== null)
}

async function sendCommentNotification (webId, friendWebId, routeUrl, comentario) {
  return sendNotificationBody(webId, friendWebId,
    `@prefix as: <https://www.w3.org/ns/activitystreams#> .
    @prefix schema: <http://schema.org/> .
    <> a as:Follow ;
    schema:agent <${webId}> ;
    schema:Action "commentRoute" ;
    schema:comment "${comentario.getTexto()}" ;
    schema:identifier <${routeUrl}> .
    `)
}