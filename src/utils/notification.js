import {ldflexHelper} from './index';
import solid from 'solid-auth-client';

export const sendNotification = async (opponent, content, createNotification, to) => {
  try {
    if (to) {
      return createNotification(content, to);
    }
    /**
     * If the opponent doesn't have an inbox, show an error
     */
    throw new Error('Error: The opponent does not have an available inbox');
  } catch (error) {
    throw new Error(error);
  }
};

export const findUserInboxes = async paths => {
  try {
    let inboxes = [];

    for await (const path of paths) {
      const { path: currentPath } = path;
      const inbox = await ldflexHelper.discoverInbox(currentPath);

      if (inbox) {
        inboxes = [...inboxes, { ...path, path: inbox }];
      }
    }
    console.log(inboxes);
    return inboxes;
  } catch (error) {
    throw new Error(error);
  }
};

export const getDefaultInbox = (inboxes, inbox1, inbox2) =>
  inboxes.find(inbox => inbox.name === inbox1) || inboxes.find(inbox => inbox.name === inbox2);

export const hasInbox=async path=>{
  const result = await solid.fetch(path, { method: 'GET' });
    return result.status === 403 || result.status === 200;
};
