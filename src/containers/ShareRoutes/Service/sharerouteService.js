  
import { notification ,storageHelper,ldflexHelper} from '@utils';
import { NotificationTypes } from '@inrupt/solid-react-components';

export const publish = async (createInbox,createNotification, content, webId, type) => {
  try {
    
    type = type || NotificationTypes.ANNOUNCE;
    const appPath = await storageHelper.getAppStorage(content.actor);
    const license = 'https://creativecommons.org/licenses/by-sa/4.0/';

    
    const viadeSettings = `${appPath}settings.ttl`;

      const inboxes = await notification.findUserInboxes([
        { path: content.actor, name: "Global" },
        { path: viadeSettings, name: "Viade" }
      ]);
      const to = notification.getDefaultInbox(inboxes, "Viade", "Global");
    /*
    if (to){
      await createNotification({
        title: content.title,
        summary: content.summary,
        actor: content.actor,
        object: content.object,
        target: content.target
      }, to.path  , type, license);
      console.log("bueno parece que si");
    }
    */
    
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
