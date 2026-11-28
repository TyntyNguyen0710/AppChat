import {useEffect, useRef, useState} from "react";
import {useAuth} from "../context/AuthContext";
import {useChat} from "../context/ChatContext";
import MessageItem from "./MessageItem.tsx";
import {OutRoom} from "./ChatActions";

export function ChatWindow() {
    const auth = useAuth();
    const chat = useChat();
    const current = chat.current;
    const [text, setText] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null);
    const lastMessage = chat.messages[chat.messages.length - 1];

    // co tin moi o cuoi thi cuon xuong cuoi (xem tin cu o tren thi khong cuon)
    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    },[lastMessage]);

    // doi cuoc tro chuyen thi xoa chu dang go do
    useEffect(()=>{
        setText("");
    },[current?.name, current?.type]);

    // chat 1-1: hoi server nguoi kia co online khong, 10 giay hoi lai 1 lan
    useEffect(()=>{
        if(!current || current.type !== 0){
            return;
        }
        chat.checkOnline(current.name);
        const timer = setInterval(()=>{
            chat.checkOnline(current.name);
        }, 10000);
        return ()=>clearInterval(timer);
    },[current?.name, current?.type]);

    const handleSend = () => {
        if(text.trim() === ""){
            return;
        }
        chat.sendChat(current.type, current.name, text);
        setText("");
    }

    if(!current){
        return (
            <div className='vh-100 d-flex align-items-center justify-content-center text-muted'>
                <h5>Chọn một cuộc trò chuyện để bắt đầu</h5>
            </div>
        )
    }

    return (
        <div className='d-flex flex-column vh-100'>
            <div className='border-bottom p-3 d-flex justify-content-between align-items-center'>
                <div>
                    <h5 className='mb-0'>
                        {current.name}
                        {auth.user === chat.owner && current.type === 1 &&
                        <span className="badge rounded-pill bg-info text-white ms-2">
                            Chủ phòng
                        </span>
                    }
                    </h5>
                    {current.type === 1 ? (
                        <small className='text-muted'>Phòng chat</small>
                    ) : (
                        <small className={chat.online ? 'text-success' : 'text-muted'}>
                            Chat 1-1 · {chat.online ? 'Đang online' : 'Offline'}
                        </small>
                    )}
                </div>
                <div>
                    {current.type === 1 && <OutRoom onOutRoom={chat.outRoom}/>}
                </div>
            </div>

            <div className='flex-grow-1 overflow-auto p-3 bg-light' style={{ minHeight: 0 }}>
                {chat.error && <div className='alert alert-danger'>{chat.error}</div>}
                {chat.hasMore && (
                    <div className='text-center mb-2'>
                        <button className='btn btn-sm btn-outline-primary' onClick={chat.loadMore}>
                            Xem tin cũ hơn</button>
                    </div>
                )}
                {chat.hasNewer && (
                    <div className='text-center mb-2'>
                        <button className='btn btn-sm btn-outline-primary' onClick={chat.loadNewer}>
                            Xem tin mới hơn</button>
                    </div>
                )}
                {chat.messages.map((m:any, index:number) => (
                    <MessageItem key={index} message={m} isMe={m.name === auth.user} showName={current.type === 1} />
                ))}
                <div ref={bottomRef}></div>
            </div>

            <div className='border-top p-3 d-flex gap-2'>
                <input type='text' className='form-control' placeholder='Nhập tin nhắn...'
                       value={text}
                       onChange={(e) => setText(e.target.value)}
                       onKeyDown={(e) => {if(e.key === "Enter") handleSend()}} />
                <button className='btn btn-primary' onClick={handleSend}>Gửi</button>
            </div>
        </div>
    )
}