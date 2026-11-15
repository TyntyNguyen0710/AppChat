import {send, onEvent} from "./ChatSocket";

// 1. CREATE_ROOM
export function createRoom(roomName: string) {
    if(!roomName.trim() || roomName.trim() == ""){
        return;
    }
    send("CREATE_ROOM", {name: roomName.trim()});
}
onEvent("CREATE_ROOM", (res)=>{
    if(res.status == "success"){
        console.log("Tạo phòng thành công", res.data);
    }
    if(res.status == "error"){
        console.error("Tạo phòng thất bại: " + res.mes);
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
    if(!roomName.trim() || roomName.trim() == ""){
        return;
    }
    send("LEAVE_ROOM", {name: roomName.trim()});
}
onEvent("LEAVE_ROOM", (res)=>{
    if(res.status == "success"){
        console.log("Rời khỏi phòng thành công", res.data);
    }
    if(res.status == "error"){
        console.error("Rời khỏi phòng thất bại: " + res.mes);
    }
});
