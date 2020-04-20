  
import { storageHelper,ldflexHelper} from '@utils';
import auth from "solid-auth-client";
import FC from 'solid-file-client';

export const getRouteShareByFriend = async (webId,friendWebId) => {
  //Mirar si tiene un archivo
  const path = await storageHelper.getAppStorage(webId);
  const friend_file_name=friendWebId.name.split("//")[1].split("/")[0];
    
    const path_friend=`${path}shared/${friend_file_name}.jsonld`;
    const lista=[];
    //1-Se mira si existe el fichero
    if (await ldflexHelper.resourceExists(path_friend)){
        //Existe
        var jsonFriend={};
        await getJSONFriend(path_friend).then(function(result) {
            jsonFriend = JSON.parse(result);
        }); 
        for(var i=0;i<jsonFriend.routes.length;i++){
            lista.push(jsonFriend.routes[i]["@id"]);
        }
    }
    return lista;
}

const getJSONFriend = async (jsonUrl) => {
    
    const fc   = new FC( auth );
    if(await fc.itemExists(jsonUrl)) {
        return await fc.readFile(jsonUrl);
    }
}

