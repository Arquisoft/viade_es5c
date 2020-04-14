import { fetchDocument } from "tripledoc"
import { ldp } from "rdf-namespaces"
const request = require("request")

export async function getInboxUrl (webId) {
  let profileDoc
  await fetchDocument(webId)
    .then(content => {
      profileDoc = content
    })
    .catch(err => (profileDoc = null))
  if (profileDoc !== null) {
    var profile = profileDoc.getSubject("#me")
    if (profile !== null) {
      var url = profile.getRef(ldp.inbox)
      return url
    }
  }
  return null
}

// Devuelve true si logro mandar la notificacion, false si no
export async function sendNotification (webId, targetWebId, type) {
  var inbox = await getInboxUrl(targetWebId)
  request({
    method: "POST",
    uri: inbox,
    body: `@prefix as: <https://www.w3.org/ns/activitystreams#> .
          @prefix schema: <http://schema.org/> .
          <> a as:${type} ;
          schema:agent <${webId}> .`,
    headers: {
      "Content-Type": "text/turtle"
    }
  },
  function (error, response, body) {
    if (error) { return false } else {
      console.log("Notificacion subida correctamente, el servidor respondio con :", body)
      return true
    }
  })
}
// Devuelve true si logro mandar la notificacion, false si no
export async function sendNotificationBody (webId, targetWebId, body) {
  var inbox = await getInboxUrl(targetWebId)
  await request({
    method: "POST",
    uri: inbox,
    body: body,
    headers: {
      "Content-Type": "text/turtle"
    }
  },
  function (error, response, body) {
    if (error) { return false } else {
      console.log("Notificacion subida correctamente, el servidor respondio con :", body)
      return true
    }
  })
}

// devuelve todos los documentos en la bandeja de entrada del usuario
export async function getNotificationDocuments (webId) {
  var inbox = await getInboxUrl(webId)

  var containerDoc = await fetchDocument(inbox)
  if (containerDoc) {
    var containerSub = containerDoc.getSubject(inbox)
    var containerItemUrls = containerSub.getAllRefs(ldp.contains)
    var result = []
    for (var i = 0; i < containerItemUrls.length; i++) {
      try {
        var doc = await fetchDocument(containerItemUrls[i])
        if (doc) {
          result = [...result, doc]
        }
      } catch (e) {
      }
    }
    return result
  }
  return []
}