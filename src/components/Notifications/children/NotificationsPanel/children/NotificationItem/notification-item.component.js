import React, {useCallback} from 'react';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Body, Delete, Img, Item, MarkAsRead, Message, Meta} from './notification-item.style';

type Props = {
    notification: Object,
    markAsRead: Function,
    children: React.ReactNode,
    deleteNotification: (fileName: string) => void
};

/**
 * Notification item to be shown for each notification in the notification list
 */
const NotificationItem = ({ notification, markAsRead, children, deleteNotification ,accept}: Props) => {
  const { read } = notification;
  const currentRead = read ? JSON.parse(read) : false;
  const { actor } = notification;
  /**
   * Redirect notification if it's coming with target
   * @type {Function}
   */
  const redirectTo = useCallback(async () => {
    if (notification.target) {
      await markAsRead(notification.path, notification.id);
      window.location = notification.target;
    }
  }, [notification]);
  /**
   * @TODO: send boolean to pod like boolean and not string
   */

  //const opCurrentRead = !currentRead;
  const defaultImage = 'img/icon/empty-profile.svg';
  const actorImage =
    notification && notification.actor && notification.actor.image
      ? notification.actor.image
      : defaultImage;
  return (
    
    <Item read={currentRead}>
      <a href={notification.actor && notification.actor.webId}>
        <Img
          src={actorImage}
          alt="Creator"
          onError={e => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
        />
      </a>
      <Body>
        <Message onClick={redirectTo}>
          <strong>{actor && actor.name}</strong> {notification.summary}
        </Message>
        <Meta>
          <span className="moment">{moment(notification.published).fromNow()}</span>
          {children}
        </Meta>
      </Body>
      
      <MarkAsRead
        type="button"
        className="delete"
        onClick={() => accept(notification.object,notification.actor,notification.path)
  
                }
      >
        <FontAwesomeIcon icon="check-circle" />
      </MarkAsRead>
      <Delete
        type="button"
        className="delete"
        onClick={() => deleteNotification(notification.path)}
      >
      
        <FontAwesomeIcon icon="times-circle" />

      </Delete>
      
    </Item>
  );
};
/*

      <MarkAsRead
        type="button"
        className="delete"
        onClick={() =>
          markAsRead(notification.path, notification.id, opCurrentRead ? 'true' : 'false')
        }
      >
        <FontAwesomeIcon icon={currentRead ? 'eye-slash' : 'eye'} />
      </MarkAsRead>
 */
export default NotificationItem;
