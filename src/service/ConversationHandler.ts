import {store} from "../store/Store";
import {onEvent} from "./ChatSocket";
import {setConversations} from "../store/slice/ConversationSlice";

onEvent("GET_USER_LIST", (res)=>{
    if(res.status === "success"){
        store.dispatch(setConversations(res.data));
    }
});