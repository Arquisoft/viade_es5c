import {listFriends} from "./Scripts/ListFriends";

export default class Service {
    static getFriends() {
        return listFriends();
    }
}