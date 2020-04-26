import {permissionHelper, storageHelper} from '@utils';
import {AccessControlList, NotificationTypes} from '@inrupt/solid-react-components';

export const publish = async (createNotification, discoverInbox, content, friendWebId, type) => {
    try {


        type = type || NotificationTypes.ANNOUNCE;
        const appPath = await storageHelper.getAppStorage(friendWebId);
        const license = 'https://creativecommons.org/licenses/by-sa/4.0/';

        /*
        const viadeSettings = `${appPath}settings.ttl`;
        
          const inboxes = await notification.findUserInboxes([
            { path: content.actor, name: "Global" },
            { path: viadeSettings, name: "Viade" }
          ]);
          console.log(inboxes);
          */
        const to = {
            path: appPath + "inbox/",
            name: "Viade"
        };

        /*
        const to = notification.getDefaultInbox(inboxes, "Viade", "Global");
                  console.log(to);
        console.log(to);
        */

        if (to) {
            try {
                await createNotification({
                    title: content.title,
                    summary: content.summary,
                    actor: content.actor,
                    object: content.object,
                    target: content.target
                }, to.path, type, license);
                console.log("bueno parece que si");
                //Dar permiso a ese amigo 
                //Sacar los amigos que tienen permiso 
                //Se le añade como amigo
                //Se cambia el fichero .acl con los nuevos amigos
                const routePath = content.object;
                updatePermission(content.actor, friendWebId, routePath)
            } catch (err) {
                console.log(err);
            }

        }
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

const updatePermission = async (webId, friendWebId, routePath) => {
    //Miramos si tenemos control que deberíamos ya que es nuestra
    const hasControlPermissions = await permissionHelper.checkSpecificAppPermission(
        webId,
        AccessControlList.MODES.CONTROL
    );
    if (hasControlPermissions) {
        await permissionHelper.setPermissionInRouteToFriend(webId, friendWebId, routePath);
    }
}
