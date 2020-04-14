  
import { notification ,storageHelper,permissionHelper} from '@utils';
import { NotificationTypes,AccessControlList } from '@inrupt/solid-react-components';

export const publish = async (createNotification, content, friendWebId, type) => {
  try {
    
    type = type || NotificationTypes.ANNOUNCE;
    const appPath = await storageHelper.getAppStorage(content.actor);
    const license = 'https://creativecommons.org/licenses/by-sa/4.0/';

    /*
    const viadeSettings = `${appPath}settings.ttl`;

      const inboxes = await notification.findUserInboxes([
        { path: content.actor, name: "Global" },
        { path: viadeSettings, name: "Viade" }
      ]);
      const to = notification.getDefaultInbox(inboxes, "Viade", "Global");
    
    if (to){
      await createNotification({
        title: content.title,
        summary: content.summary,
        actor: content.actor,
        object: content.object,
        target: content.target
      }, to.path  , type, license);
      console.log("bueno parece que si");
      //Dar permiso a ese amigo 
      //Sacar los amigos que tienen permiso 
      //Se le añade como amigo
      //Se cambia el fichero .acl con los nuevos amigos
    }
    */
   const routePath=content.object;
   updatePermission(content.actor,friendWebId,routePath)
    
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

const updatePermission=async(webId,friendWebId, routePath)=>{
  //Miramos si tenemos control que deberíamos ya que es nuestra
  const hasControlPermissions = await permissionHelper.checkSpecificAppPermission(
    webId,
    AccessControlList.MODES.CONTROL
  );
  if (hasControlPermissions){
    await permissionHelper.setPermissionInRouteToFriend(webId,friendWebId,routePath);
  }
}
