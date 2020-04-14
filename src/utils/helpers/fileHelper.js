import { space } from "rdf-namespaces"
import { fetchDocument } from "tripledoc"
const auth = require("solid-auth-client")
const FC = require("solid-file-client")
const fc = new FC(auth)

export async function getRootStorage (webId) {
  const profileDocument = await fetchDocument(webId)
  const profile = profileDocument.getSubject(webId)

  // Get the root URL of the user"s Pod:
  return profile.getRef(space.storage)
}
export async function readFolder (route) {
  let folder
  await fc
    .readFolder(route)
    .then(content => {
      folder = content
    })
    .catch(err => (folder = null))
  return folder
}
export async function existsFileInFolder (route, file) {
  let folder
  folder = await readFolder(route)
  if (folder) {
    for (var i = 0; i < folder.files.length; i++) {
      if (folder.files[i].name === file) { return true }
    }
  }
  return false
}
export async function existsFile (fileUrl) {
  let result = false
  await fc
    .readFile(fileUrl)
    .then(() => {
      result = true
    })
    .catch(err => (result = false))
  return result 
}
export async function moveFile (sourceURL, targetURL) {
  let result = false
  await fc
    .copy(sourceURL, targetURL, { withMeta: true, withAcl: true })
    .then(() => {
      result = true
    })
    .catch(err => (result = false))

  if (result) {
    deleteFile(sourceURL)
  } else { return result }
}
export async function deleteFile (sourceURL) {
  let result = false
  await fc
    .delete(sourceURL)
    .then(() => {
      result = true
    })
    .catch(err => (result = false))
  return result
}