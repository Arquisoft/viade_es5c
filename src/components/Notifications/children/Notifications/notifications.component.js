import React, {useEffect, useRef, useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import {useLiveUpdate, useNotification} from '@inrupt/solid-react-components';
import {NotificationsWrapper} from './notifications.style';
import {Bell, NotificationsPanel} from '../index';
import {useOnClickOutside} from '@hooks';
import {ldflexHelper,storageHelper} from '@utils';

import auth from "solid-auth-client";
import FC from 'solid-file-client';

let oldTimestamp;

type Props = {
  webId: String,
  inbox: String
};

/**
 * Notification wrapper for the Bell Icon and the Notifications Panel
 */
const Notifications = ({ webId, inbox }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef();
  const toggleNotifications = () => setIsOpen(!isOpen);
  /**
   * Notification hook from solid-react-components
   */
  const {
    notification,
    markAsReadNotification: markAsRead,
    deleteNotification,
    fetchNotification,
    filterNotification
  } = useNotification(webId);
  const accept= async(ruta,friendwebid)=>{
    const path = await storageHelper.getAppStorage(webId);
    
    const fc   = new FC( auth );
    //Copiar la ruta, en el fichero del frienwebid
    const friend_file_name1=friendwebid.name.split("//");
    const friend_file_name2=friend_file_name1[1].split("/");
    const friend_file_name=friend_file_name2[0];//VALOR YA PARA EL NOMBRE DEL FICHERO
    //1-Se mira si existe el fichero
    const path_friend=`${path}shared/${friend_file_name}.jsonld`;
    console.log(path_friend);
    if (await ldflexHelper.resourceExists(path_friend)){//Si existe, se añade

      /*
      json.routes.push({"@id":ruta});
      console.log(json.routes);
      */
    }else{//Si no existe, se crea
      var text='{ "@context": { "@version": 1.1,"routes": {"@container": "@list","@id": "viade:routes"},"viade": "http://arquisoft.github.io/viadeSpec/" },';
      text+='"routes":[';
      text+='{'+'"@id": "'+ruta+'" } ] }';
      var json=JSON.parse(text);
      const routeJsonLD = {
        "@context": {
            "@version": 1.1,
            "routes": 
              {
                "@container": "@list",
                "@id": "viade:routes"
              },
            "viade": "http://arquisoft.github.io/viadeSpec/"
        },
        "routes":[
          {
            "@id": ruta
          } 
        ] 
        
      };
      console.log(routeJsonLD.routes)
      /*
      try{
        const url=webId.split("profile/card#me")[0]+"viade2Prueba1/shared/"+path_friend;
         await fc.createFile(url, parseadoRDF, "text/turtle", {});
      }catch(err){
        console.log(err);
      }
      
*/
      //Subirlo al sitio
    }
    
  }
  const { timestamp } = useLiveUpdate();
  const { notifications, unread, notify } = notification;
  /**
   * pass date to string to compare time updates
   * @type {*|string}
   */
  const currentTimestamp = timestamp && timestamp.toString();
  useOnClickOutside(ref, () => setIsOpen(false));

  /**
   * Fetch notifications from inbox
   * @returns {Promise<void>}
   */
  const initNotifications = async () => {
    try {
      setIsLoading(true);
      await fetchNotification(inbox);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  /**
   * If webId and notify instance exist we will init notifications, similar to componentDidMount
   */
  useEffect(() => {
    if (webId && notify) {
      initNotifications();
    }
  }, [inbox, notify]);

  /**
   * Fetch new notifications when liveUpdate's timestamp changes, similar to componentWillUpdate
   */
  useEffect(() => {
    if (currentTimestamp && oldTimestamp !== currentTimestamp) {
      initNotifications();
      oldTimestamp = currentTimestamp;
    }
  }, [timestamp]);

  return (
    <NotificationsWrapper ref={ref}>
      <Bell unread={unread || 0} onClick={toggleNotifications} active={isOpen} />
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="notifications"
        unmountOnExit
        mountOnEnter
      >
        <NotificationsPanel
          {...{
            notifications,
            markAsRead,
            deleteNotification,
            accept,
            tabs: inbox,
            filterNotification,
            isLoading
          }}
        />
      </CSSTransition>
    </NotificationsWrapper>
  );
};

export default Notifications;
