import {useEffect, useState} from 'react';
import {useChat} from '../context/ChatContext';
import {InputModal} from './InputModal';
import { ConfirmModal } from './ConfirmModal';

// 1. Component NewChat
export function NewChat({onNewChat}: {onNewChat?: (userName: string) => void}) {
    const [isOpen, setIsOpen] = useState(false);
    const [pending, setPending] = useState("");
    const chat = useChat();
    const current = chat.current;

 // mo chat xong thi dong cua so nhap ten
    useEffect(()=>{
        if(pending && current && current.type === 0 && current.name === pending){
            setIsOpen(false);
            setPending("");
        }
    },[current, pending]);

    const handleOpen = () => {
        chat.setNotice("");
        setIsOpen(true);
    }
    const handleClose = () => {
        chat.setNotice("");
        setIsOpen(false);
    }
    const handleNewChat = (userName: string) => {
        chat.setNotice("");
        setPending(userName);
        onNewChat?.(userName);
    }
    return (
        <>
            <button className='btn btn-sm btn-outline-success flex-fill'
                onClick={handleOpen}>
                Chat mới
            </button>
            <InputModal
                title="Chat với người dùng"
                placeholder="Nhập tên người dùng"
                isOpen={isOpen}
                error={chat.notice}
                onClose={handleClose}
                onSubmit={handleNewChat}
            />
        </>
        );
}

// 2. Component CreateRoom
export function CreateRoom({onCreateRoom}: {onCreateRoom?: (roomName: string) => void}) {
    const [isOpen, setIsOpen] = useState(false);
    const [pending, setPending] = useState("");
    const chat = useChat();
    const current = chat.current;

    // tao phong xong thi dong cua so tao phong
    useEffect(()=>{
        if(pending && current && current.type === 1 && current.name === pending){
            setIsOpen(false);
            setPending("");
        }
    },[current]);

    const handleOpen = () => {
        chat.setNotice("");
        setIsOpen(true);
    }
    const handleClose = () => {
        chat.setNotice("");
        setIsOpen(false);
    }
    const handleCreateRoom = (roomName: string) => {
        chat.setNotice("");
        setPending(roomName);
        onCreateRoom?.(roomName);
    }
    return (
        <>
            <button className='btn btn-sm btn-outline-primary flex-fill'
                onClick={handleOpen}>
                Tạo phòng
            </button>
            <InputModal
                title="Tạo phòng chat nhiều người"
                placeholder="Nhập tên phòng"
                isOpen={isOpen}
                error={chat.notice}
                onClose={handleClose}
                onSubmit={handleCreateRoom}
            />
        </>
        );
}

// 3. Component JoinRoom
export function JoinRoom({onJoinRoom}: {onJoinRoom?: (roomName: string) => void}) {
    const [isOpen, setIsOpen] = useState(false);
    const [pending, setPending] = useState("");
    const chat = useChat();
    const current = chat.current;

    // vao phong xong thi dong cua so vao phong
    useEffect(()=>{
        if(pending && current && current.type === 1 && current.name === pending){
            setIsOpen(false);
            setPending("");
        }
    },[current, pending]);

    const handleOpen = () => {
        chat.setNotice("");
        setIsOpen(true);
    }
    const handleClose = () => {
        chat.setNotice("");
        setIsOpen(false);
    }
    const handleJoinRoom = (roomName: string) => {
        chat.setNotice("");
        setPending(roomName);
        onJoinRoom?.(roomName);
    };
    return (
        <>
            <button className='btn btn-sm btn-outline-secondary flex-fill'
                onClick={handleOpen}>
                Vào phòng
            </button>
            <InputModal
                title="Vào phòng chat nhiều người"
                placeholder="Nhập tên phòng"
                isOpen={isOpen}
                error={chat.notice}
                onClose={handleClose}
                onSubmit={handleJoinRoom}
            />
        </>
        );
}

// 4. Component OutRoom
export function OutRoom({onOutRoom}: {onOutRoom?: (roomName: string) => void}) {
    const [isOpen, setIsOpen] = useState(false);
    const chat = useChat();
    const current = chat.current;
    const roomName = current ? current.name : "";

    const handleOpen = () => {
        chat.setNotice("");
        setIsOpen(true);
    }
    const handleClose = () => {
        chat.setNotice("");
        setIsOpen(false);
    }
const handleOutRoom = () => {
        if(roomName.trim() === "" || !current)
            return;
        chat.setNotice("");
        onOutRoom?.(roomName);
    };
    return (
        <>
            <button className='btn btn-danger btn-sm'
                onClick={handleOpen}>
                Rời phòng
            </button>
            {isOpen && (
                <ConfirmModal
                    title="Rời phòng"
                    message={`Bạn có chắc muốn rời khỏi phòng ${roomName}?`}
                    isOpen={isOpen}
                    error={chat.notice}
                    onSubmit={handleOutRoom}
                    onClose={handleClose}
                />
            )}
        </>
    );
}

