import {store} from "../store/Store";
import {send, onEvent} from "./ChatSocket";
import {setCurrent, setMembers, setNotice} from "../store/slice/ChatSlice";
import {useAuth} from "../context/AuthContext";
import {useChat} from "../context/ChatContext";

// 1. CREATE_ROOM
export function createRoom(roomName: string) {
    if(!roomName.trim() || roomName.trim() == ""){
        return;
    }
    if(!send("CREATE_ROOM", {name: roomName.trim()})){
        store.dispatch(setNotice("Chưa kết nối được tới server"));
    }
}
onEvent("CREATE_ROOM", (res)=>{
    if(res.status === "success"){
        store.dispatch(setCurrent({name: res.data.name, type: 1}));
        store.dispatch(setMembers(res.data.user));
        send("GET_USER_LIST");
    }
    if(res.status === "error"){
        store.dispatch(setNotice(res.mes || "Không tạo được phòng"));
    }
});

// 2. JOIN_ROOM
export function joinRoom(roomName: string) {
    if(!roomName.trim() || roomName.trim() == ""){
        return;
    }
    send("JOIN_ROOM", {name: roomName.trim()});
}
onEvent("JOIN_ROOM", (res)=>{
    if(res.status == "success"){
        console.log("Tham gia phòng thành công", res.data);
    }
    if(res.status == "error"){
        console.error("Tham gia phòng thất bại: " + res.mes);
    }
});

// 3. OUT_ROOM
export function outRoom(roomName: string) {
    if(!roomName.trim() || roomName.trim() == "" || useChat().members.indexOf(useAuth().user) == 0){
        return;
    }
    send("OUT_ROOM", {name: roomName.trim()});
}
onEvent("OUT_ROOM", (res)=>{
    if(res.status == "success"){
        console.log("Rời khỏi phòng thành công", res.data);
    }
    if(res.status == "error"){
        console.error("Rời khỏi phòng thất bại: " + res.mes);
    }
});