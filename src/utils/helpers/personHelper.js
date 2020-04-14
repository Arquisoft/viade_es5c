import { fetchDocument } from "tripledoc"
import User from "../../entities/User.js"

export async function getPersonaByWebId (webId) {
  const profileDoc = await fetchDocument(webId)
  var profile = profileDoc.getSubject(webId)
  var user = new User(profile.getString("http://xmlns.com/foaf/0.1/name"), webId, profile.getRef("http://www.w3.org/2006/vcard/ns#hasPhoto"))
  return user
}