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
  const getJSONFriend = async (jsonUrl) => {
    
    const fc   = new FC( auth );
    if(await fc.itemExists(jsonUrl)) {
        return await fc.readFile(jsonUrl);
    }
  }
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
  const accept= async(ruta,friendwebid,notificationPath)=>{
    //Saca el path de la aplicacion, o sea viade/
    const path = await storageHelper.getAppStorage(webId);
    const fc   = new FC( auth );

    //Sacamos el nombre que debería tener el fichero de compartir
    console.log(friendwebid)
    const friend_file_name=friendwebid.webId.split("//")[1].split("/")[0];
    
    const path_friend=`${path}shared/${friend_file_name}.jsonld`;
    //1-Se mira si existe el fichero
    if (await ldflexHelper.resourceExists(path_friend)){//Si existe, se añade
      //Sacas el fichero, lo pasas a JSON, miras si se encuentra, y sino le añades al amigo
      var jsonFriend={};
      await getJSONFriend(path_friend).then(function(result) {
        jsonFriend = JSON.parse(result);
      }); 
      const lista_rutas=jsonFriend.routes.filter(em=>em["@id"]===ruta);
      if (lista_rutas>0){
        //Ya se encuentra dentro
      }else{
        
        jsonFriend.routes.push({"@id":ruta});
        try{
          await fc.createFile(path_friend, JSON.stringify(jsonFriend), "text/plain", {});
        }catch(err){
          console.log(err);
        }
      
      }
      
    }else{//Si no existe, se crea
      
      const compartir = {
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
      try{
         await fc.createFile(path_friend, JSON.stringify(compartir), "text/plain", {});
      }catch(err){
        console.log(err);
      }
      
      

      //Subirlo al sitio
    }
    //En cualquier caso, desaparece la notificación!!!!!!!!
    deleteNotification(notificationPath);
    
    
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
