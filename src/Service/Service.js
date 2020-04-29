import {listFriends} from "./Scripts/ListFriends";
import {listRoutes} from "./Scripts/ListRoutes";

export default class Service {
    static getFriends() {
        return listFriends();
    }

    static  getRoutes(){
        return listRoutes();
    }
}