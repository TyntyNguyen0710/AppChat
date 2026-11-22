import {useEffect, useState} from "react";
import {isConnected, onClose, onOpen} from "../service/ChatSocket";

// Cho biết đang kết nối tới server hay không
export function useConnected(){
    const [connected, setConnected] = useState(isConnected());

    useEffect(()=>{
        const offOpen = onOpen(()=>setConnected(true));
        const offClose = onClose(()=>setConnected(false));
        setConnected(isConnected());
        return ()=>{
            offOpen();
            offClose();
        };
    },[]);

    return connected;
}