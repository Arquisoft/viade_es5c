  
import { notification } from '@utils';
import { NotificationTypes } from '@inrupt/solid-react-components';

export const publish = async (createInbox,createNotification, content, webId, type) => {
  try {
    
    type = type || NotificationTypes.ANNOUNCE;
    
    const license = 'https://creativecommons.org/licenses/by-sa/4.0/';

    const inboxes = await notification.findUserInboxes([
      { path: webId, name: 'Global' }
    ]);
    if (inboxes.length === 0)
      return false;

    const to = notification.getDefaultInbox(inboxes, 'Global');
    //Si tienes permiso de escritura en el inbox de la persona
    
    const inbox_url=(content.actor).split("profile/card#me")[0]+"viade/inbox";
    const path_app=(content.actor).split("profile/card#me")[0]+"viade";
    console.log(inbox_url);
    await createInbox(inbox_url,path_app);
    
    if (inbox_url) {
      
      await createNotification({
        title: content.title,
        summary: content.summary,
        actor: content.actor,
        object: content.object,
        target: content.target
      }, inbox_url  , type, license);
      console.log("bueno parece que si");
    }
    
    
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
