import {createContext, useContext, useEffect, useRef, useState} from "react";
import {onEvent, send} from "../service/ChatSocket";
import {useAuth} from "./AuthContext";

const ChatContext = createContext<any>(null);

export function ChatProvider({children}: any){
    const auth = useAuth();
    const [conversations, setConversations] = useState<any[]>([]);
    const [current, setCurrent] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [members, setMembers] = useState<any[]>([]);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");

    //lay gia tri moi nhat upload len server khi ket noi
    const userRef = useRef(auth.user);
    const currentRef = useRef<any>(null);
    userRef.current = auth.user;

    const now = ()=>new Date().toLocaleString("sv-SE");

    const loadConversations = ()=>{
        send("GET_USER_LIST");
    }

    //xac nhan phien tro chuyen dang hoat dong
    const selectConversation = (item: any)=>{
        const cur = currentRef.current;
        if(item && cur && item.name === cur.name && item.type === cur.type){
            return;
        }
        currentRef.current = item;
        setCurrent(item);
        setMessages([]);
        setMembers([]);
        setError("");
    }

    // neu khong co tin gi thi them tin moi len server
    const addMessage = (m: any)=>{
        setMessages((prev)=>{
            const index = prev.findIndex((x:any)=>x.tmp && x.name === m.name && x.to === m.to && x.mes === m.mes);
            if(index >= 0){
                const copy = [...prev];
                copy[index] = m;
                return copy;
            }
            return [...prev, m];
        });
    }

    useEffect(()=>{
        const offs = [
            onEvent("LOGIN", (res)=>{
                if(res.status === "success"){
                    loadConversations();
                }
            }),
            onEvent("RE_LOGIN", (res)=>{
                if(res.status === "success"){
                    loadConversations();
                }
            }),
            onEvent("GET_USER_LIST", (res)=>{
                if(res.status === "success"){
                    setConversations(res.data);
                }
            }),
            onEvent("CREATE_ROOM", (res)=>{
                if(res.status === "success"){
                    selectConversation({name: res.data.name, type: 1});
                    setMembers(res.data.user || []);
                    loadConversations();
                }
                if(res.status === "error"){
                    setNotice(res.mes || "Không tạo được phòng");
                }
            }),
            onEvent("JOIN_ROOM", (res)=>{
                if(res.status === "success"){
                    selectConversation({name: res.data.name, type: 1});
                    setMembers(res.data.user || []);
                    loadConversations();
                }
                if(res.status === "error"){
                    setNotice(res.mes || "Không vào được phòng");
                }
            }),
            onEvent("OUT_ROOM", (res)=>{
                if(res.status === "success"){
                    selectConversation(null);
                    loadConversations();
                }
                if(res.status === "error"){
                    setNotice(res.mes || "Không rời được phòng");
                }
            }),
            onEvent("SEND_CHAT", (res)=>{
                if(res.status === "success"){
                    const m = res.data;
                    const me = userRef.current;
                    const cur = currentRef.current;
                    let inside = false;
                    if(cur){
                        if(Number(m.type) === 1){
                            inside = cur.type === 1 && cur.name === m.to;
                        }else{
                            inside = cur.type === 0 && ((m.name === cur.name && m.to === me) || (m.name === me && m.to === cur.name));
                        }
                    }
                    if(inside){
                        addMessage({...m, createAt: m.createAt || now()});
                    }
                    loadConversations();
                }
                if(res.status === "error"){
                    setMessages((prev)=>prev.filter((x:any)=>!x.tmp));
                    setError(res.mes || "Gửi tin nhắn thất bại");
                }
            })
        ];
        return ()=>offs.forEach((off)=>off());
    },[]);

    // khong con phien dang nhap thi xoa chat
    useEffect(()=>{
        if(!auth.isLogin){
            setConversations([]);
            selectConversation(null);
        }
    },[auth.isLogin]);

    const createRoom = (roomName: string)=>{
        const name = roomName.trim();
        if(name === ""){
            return;
        }
        if(!send("CREATE_ROOM", {name: name})){
            setNotice("Chưa kết nối được tới server");
        }
    }

    const joinRoom = (roomName: string)=>{
        const name = roomName.trim();
        if(name === ""){
            return;
        }
        if(!send("JOIN_ROOM", {name: name})){
            setNotice("Chưa kết nối được tới server");
        }
    }

    const outRoom = (roomName: string)=>{
        const name = roomName.trim();
        if(name === ""){
            return;
        }
        if(!send("OUT_ROOM", {name: name})){
            setNotice("Chưa kết nối được tới server");
        }
    }

    const sendChat = (type: number, to: string, mes: string)=>{
        const content = mes.trim();
        if(content === ""){
            return;
        }
        setError("");
        if(!send("SEND_CHAT", {type: type === 1 ? "room" : "people", to: to, mes: content})){
            setError("Chưa kết nối được tới server");
            return;
        }
        // tra ve tin khi gui len server
        setMessages((prev)=>[...prev, {name: userRef.current, to: to, mes: content, type: type, createAt: now(), tmp: true}]);
    }

    return(
        <ChatContext.Provider value={{conversations, current, messages, members, error, notice, setNotice,
            selectConversation, createRoom, joinRoom, outRoom, sendChat}}>
            {children}
        </ChatContext.Provider>
    )
}

export function useChat(){
    return useContext(ChatContext);
}