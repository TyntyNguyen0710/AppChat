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

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    },[chat.messages.length]);

    useEffect(()=>{
        setText("");
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
                     <h5 className='mb-0'>{current.name}</h5>
                <small className='text-muted'>{current.type === 1 ? 'Phòng chat' : 'Chat 1-1'}</small>
                </div>
                <div>
                    {current.type === 1 &&<OutRoom onOutRoom={chat.outRoom}/>}
                </div>  
            </div>

            <div className='flex-grow-1 overflow-auto p-3 bg-light' style={{ minHeight: 0 }}>
                {chat.error && <div className='alert alert-danger'>{chat.error}</div>}
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