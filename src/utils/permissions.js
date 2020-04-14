import {AccessControlList, AppPermission} from '@inrupt/solid-react-components';
import {errorToaster} from '@utils';

// Check that all permissions we need are set. If any are missing, this returns false
const checkAppPermissions = (userAppPermissions, appPermissions) =>
  appPermissions.every(permission => userAppPermissions.includes(permission));

// Function to check for a specific permission included in the app
export const checkSpecificAppPermission = async (webId, permission) => {
  const userAppPermissions = await AppPermission.checkPermissions(webId);
  return userAppPermissions.permissions.includes(permission);
};
/**
 * SDK app will need all the permissions by the user pod so we check these permissions to work without any issues.
 * Error Message object is to hold the title, message, etc strings, as we can't use i18n libraries in this non-React file
 */
export const checkPermissions = async (webId, errorMessage) => {
  /**
   * Get permissions from trustedApp.
   */
  const userApp = await AppPermission.checkPermissions(webId);

  /**
   * Get modes permissions from solid-react-components
   */
  const permissions = AccessControlList.MODES;
  const { APPEND, READ, WRITE, CONTROL } = permissions;

  // If we are missing permissions that the app requires, display an error message with a Learn More link
  if (
    userApp === null ||
    userApp.permissions === null ||
    !checkAppPermissions(userApp.permissions, [APPEND, READ, WRITE, CONTROL])
  ) {
    errorToaster(errorMessage.message, errorMessage.title, {
      label: errorMessage.label,
      href: errorMessage.href
    });
  }
};

/**
 * Helper function to fetch permissions for the game inbox, and if permissions are not set
 * correctly, then add them. This repairs a broken inbox.
 * @param inboxPath
 * @returns {Promise<void>}
 */
export const checkOrSetInboxAppendPermissions = async (inboxPath, webId) => {
  // Fetch app permissions for the inbox and see if Append is there
  const inboxAcls = new AccessControlList(webId, inboxPath);
  
  
  const permissions = await inboxAcls.getPermissions();
  
  const inboxPublicPermissions = permissions.filter(perm => perm.agents === null);
  
  const appendPermission = inboxPublicPermissions.filter(perm =>
    perm.modes.includes(AccessControlList.MODES.APPEND)
  );
  if (appendPermission.length <= 0) {
    // What do we do when the permission is missing? Add it!
    try {
      // Permission object to add. A null agent means Everyone
      const permissions = [
        {
          agents: null,
          modes: [AccessControlList.MODES.APPEND]
        }
      ];
      const ACLFile = new AccessControlList(webId, inboxPath);
      await ACLFile.createACL(permissions);
    } catch (error) {
      // TODO: Better error handling here
      throw error;
    }
  }

  return true;
};

/**
 * Helper function to fetch permissions for the game routes, and if permissions are not set
 * correctly, then add them. This repairs a broken route/path.
 * @param routePath
 * @returns {Promise<void>}
 */
export const checkOrSetNoPermissions = async (inboxPath, webId) => {
  // Fetch app permissions for the inbox and see if Append is there
  const inboxAcls = new AccessControlList(webId, inboxPath);
  
  
  const permissions = await inboxAcls.getPermissions();
  
  const inboxPublicPermissions = permissions.filter(perm => perm.agents === null);
  
  //Mira si hay alguno que no de permisos a ninguno
  const appendPermission = inboxPublicPermissions.filter(perm =>
    perm.modes.length===0
  );
  
  if (appendPermission.length <= 0) {
    // Si tiene permisos que no debería
    try {
      // Se le quita permisos a todo el mundo. A null agent means Everyone
      const permissions = [
        {
          agents: null,
          modes: []
        }
      ];
      const ACLFile = new AccessControlList(webId, inboxPath);
      await ACLFile.createACL(permissions);
    } catch (error) {
      // TODO: Better error handling here
      throw error;
    }
  }

  return true;
};

export const checkWrittenPermissions = async (inboxPath, webId) => {
  // Fetch app permissions for the inbox and see if Append is there
  const inboxAcls = new AccessControlList(webId, inboxPath);
  
  
  const permissions = await inboxAcls.getPermissions();
  
  const pathNotnull = permissions.filter(perm => perm.agents!==null);
  
  //Mira si hay alguno que no de permisos a ninguno
  if (pathNotnull.length>0){
    const webIdPermission=pathNotnull.filter(perm=>perm.agents.includes(webId));
    if (webIdPermission.length>0){
      const writtenPermission = webIdPermission.filter(perm =>
        perm.modes.includes(AccessControlList.MODES.WRITE)
      );
      if (writtenPermission.length<=0){
        return false;
      }else{
        return true;
      }
    }
  }
  return false;
};

export const setPermissionInRouteToFriend =async (webId,friendWebId,routePath)=>{
  //Primero coge los amigos que ya existe
  const routeAcls = new AccessControlList(webId, routePath);
  
  
  const permissions = await routeAcls.getPermissions();
  const array_read=[AccessControlList.MODES.READ];
  const pathNotnull = permissions.filter(perm=>perm.modes.toString()===array_read.toString())
  
  if (pathNotnull.length>0){
    //Miramos si el está 
    const amigos_tood=pathNotnull[0];
    if (amigos_tood.agents.includes(friendWebId)){
      //Ya está, AVISAR
    }else{
      const amigos=amigos_tood.agents;
      amigos.push(friendWebId); //Se añade al amigo
      try {
        // Se le quita permisos a todo el mundo. A null agent means Everyone
        const permissions = [
          {
            agents: amigos,
            modes: [AccessControlList.MODES.READ]
          }
        ];
        const ACLFile = new AccessControlList(webId, routePath);
        await ACLFile.createACL(permissions);
      } catch (error) {
        // TODO: Better error handling here
        throw error;
      }
    }
  
      
  }else{
      
    //Quiere decir que no hay ningun amigo entonces se añade
    try {
      // Se le quita permisos a todo el mundo. A null agent means Everyone
      const permissions = [
        {
          agents: friendWebId,
          modes: [AccessControlList.MODES.WRITE]
        }
      ];
      const ACLFile = new AccessControlList(webId, routePath);
      await ACLFile.createACL(permissions);
    } catch (error) {
      // TODO: Better error handling here
      throw error;
    }
    
    
  
  
  
  }

}
