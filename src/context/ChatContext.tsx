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
    const [hasMore, setHasMore] = useState(false);
    const [online, setOnline] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");

    // giu gia tri moi nhat de cac ham nhan du lieu tu server doc duoc (khong bi cu)
    const userRef = useRef(auth.user);
    const currentRef = useRef<any>(null);
    const pageRef = useRef(1);
    const pendingUser = useRef("");
    userRef.current = auth.user;

    const now = ()=>new Date().toLocaleString("sv-SE");

    const loadConversations = ()=>{
        send("GET_USER_LIST");
    }

    // lay lich su tin nhan cua cuoc tro chuyen, moi trang 50 tin
    const loadHistory = (item: any, page: number)=>{
        pageRef.current = page;
        if(item.type === 1){
            send("GET_ROOM_CHAT_MES", {name: item.name, page: page});
        }else{
            send("GET_PEOPLE_CHAT_MES", {name: item.name, page: page});
        }
    }

    // dua lich su vao khung chat: trang 1 thi thay the, trang sau thi them len dau
    const saveHistory = (list: any[])=>{
        const sorted = [...list].sort((a:any, b:any)=>a.id - b.id);
        setHasMore(list.length >= 50);
        if(pageRef.current > 1){
            setMessages((prev)=>{
                const ids = new Set(prev.map((x:any)=>x.id));
                return [...sorted.filter((x:any)=>!ids.has(x.id)), ...prev];
            });
        }else{
            setMessages((prev)=>[...sorted, ...prev.filter((x:any)=>x.tmp)]);
        }
        setError("");
    }

    // chon cuoc tro chuyen va lay lich su, chon lai dung cuoc dang mo thi giu nguyen (tra ve false)
    const selectConversation = (item: any)=>{
        const cur = currentRef.current;
        if(item && cur && item.name === cur.name && item.type === cur.type){
            return false;
        }
        currentRef.current = item;
        setCurrent(item);
        setMessages([]);
        setMembers([]);
        setHasMore(false);
        setOnline(false);
        setError("");
        if(item){
            loadHistory(item, 1);
        }
        return true;
    }

    // tin tam (hien ngay khi gui) duoc thay bang tin that server tra ve, khong co tin tam thi them tin moi
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
            onEvent("CHECK_USER_EXIST", (res)=>{
                if(res.status === "success" && res.data.status){
                    selectConversation({name: pendingUser.current, type: 0});
                }else if(res.status === "success"){
                    setNotice("Người dùng không tồn tại");
                }else{
                    setNotice(res.mes || "Không kiểm tra được người dùng");
                }
            }),
            onEvent("CHECK_USER_ONLINE", (res)=>{
                if(res.status === "success"){
                    setOnline(Boolean(res.data.status));
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
                    const room = {name: res.data.name, type: 1};
                    // dang mo dung phong nay roi thi tai lai lich su
                    if(!selectConversation(room)){
                        loadHistory(room, 1);
                    }
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
            onEvent("GET_ROOM_CHAT_MES", (res)=>{
                const cur = currentRef.current;
                if(!cur || cur.type !== 1){
                    return;
                }
                if(res.status === "success"){
                    // phan hoi cua phong khac (da chuyen phong) thi bo qua
                    if(cur.name !== res.data.name){
                        return;
                    }
                    setMembers(res.data.user || []);
                    saveHistory(res.data.chatMess || []);
                }
                if(res.status === "error"){
                    setError(res.mes || "Không tải được tin nhắn");
                }
            }),
            onEvent("GET_PEOPLE_CHAT_MES", (res)=>{
                const me = userRef.current;
                const cur = currentRef.current;
                if(!cur || cur.type !== 0){
                    return;
                }
                if(res.status === "success"){
                    const list = res.data || [];
                    // tin dau tien khong thuoc cuoc tro chuyen dang mo thi bo qua (phan hoi cu)
                    const m = list[0];
                    if(m && !((m.name === cur.name && m.to === me) || (m.name === me && m.to === cur.name))){
                        return;
                    }
                    saveHistory(list);
                }
                if(res.status === "error"){
                    setError(res.mes || "Không tải được tin nhắn");
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

    // khong con phien dang nhap thi xoa du lieu chat
    useEffect(()=>{
        if(!auth.isLogin){
            setConversations([]);
            selectConversation(null);
        }
    },[auth.isLogin]);

    const newChat = (userName: string)=>{
        const name = userName.trim();
        if(name === ""){
            return;
        }
        if(name === userRef.current){
            setNotice("Không thể chat với chính mình");
            return;
        }
        pendingUser.current = name;
        if(!send("CHECK_USER_EXIST", {user: name})){
            setNotice("Chưa kết nối được tới server");
        }
    }

    const checkOnline = (userName: string)=>{
        send("CHECK_USER_ONLINE", {user: userName});
    }

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

    // xem tin cu hon (trang tiep theo)
    const loadMore = ()=>{
        if(currentRef.current){
            loadHistory(currentRef.current, pageRef.current + 1);
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
        // hien tin ngay khi gui, khi server tra ve thi thay bang tin that
        setMessages((prev)=>[...prev, {name: userRef.current, to: to, mes: content, type: type, createAt: now(), tmp: true}]);
        // chat 1-1 server khong gui lai cho nguoi gui, tai lai danh sach cuoc tro chuyen hien ra
        if(type !== 1){
            loadConversations();
        }
    }

    return(
        <ChatContext.Provider value={{conversations, current, messages, members, hasMore, online, error, notice, setNotice,
            selectConversation, newChat, checkOnline, createRoom, joinRoom, outRoom, loadMore, sendChat}}>
            {children}
        </ChatContext.Provider>
    )
}

export function useChat(){
    return useContext(ChatContext);
}