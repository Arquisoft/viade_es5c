import {notification} from '@utils';
import {NotificationTypes} from '@inrupt/solid-react-components';

export const publish = async (createNotification, content, webId, type) => {
    try {

        type = type || NotificationTypes.ANNOUNCE;

        const license = 'https://creativecommons.org/licenses/by-sa/4.0/';

        const inboxes = await notification.findUserInboxes([
            {path: webId, name: 'Global'}
        ]);

        if (inboxes.length === 0)
            return false;

        const to = notification.getDefaultInbox(inboxes, 'Global');

        if (to) {

            await createNotification({
                title: content.title,
                summary: content.summary,
                actor: content.actor,
                object: content.object,
                target: content.target
            }, to.path, type, license);
        }

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}
