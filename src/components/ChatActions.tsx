import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setNotice} from '../store/slice/ChatSlice';
import {InputModal} from './InputModal';

// 1. Component NewChat
export function NewChat({onNewChat}: {onNewChat?: (targetUser: string) => void}) {
    const [isOpen, setIsOpen] = useState(false);
    const handleNewChat = (targetUser: string) => {
        onNewChat?.(targetUser);
        setIsOpen(false);
    }
    return (
        <>
            <button className='btn btn-sm btn-outline-primary flex-fill'
                onClick={() => setIsOpen(true)}>
                Chat mới
            </button>
            <InputModal
                title="Phòng chat 1-1"
                placeholder="Nhập tên người dùng"
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}             
                onSubmit={handleNewChat}
            />
        </>
        );
}

// 2. Component CreateRoom
export function CreateRoom({onCreateRoom}: {onCreateRoom?: (roomName: string) => void}) {
    const [isOpen, setIsOpen] = useState(false);
    const [pending, setPending] = useState("");
    const notice = useSelector((state:any)=>state.chat.notice);
    const current = useSelector((state:any)=>state.chat.current);
    const dispatch = useDispatch();

    // tao phong xong thi dong cua so tao phong
    useEffect(()=>{
        if(pending && current && current.type === 1 && current.name === pending){
            setIsOpen(false);
            setPending("");
        }
    },[current]);

    const handleOpen = () => {
        dispatch(setNotice(""));
        setIsOpen(true);
    }
    const handleClose = () => {
        dispatch(setNotice(""));
        setIsOpen(false);
    }
    const handleCreateRoom = (roomName: string) => {
        dispatch(setNotice(""));
        setPending(roomName);
        onCreateRoom?.(roomName);
    }
    return (
        <>
            <button className='btn btn-sm btn-outline-success flex-fill'
                onClick={handleOpen}>
                Tạo phòng
            </button>
            <InputModal
                title="Tạo phòng chat nhiều người"
                placeholder="Nhập tên phòng"
                isOpen={isOpen}
                error={notice}
                onClose={handleClose}
                onSubmit={handleCreateRoom}
            />
        </>
        );
}

// 3. Component JoinRoom
export function JoinRoom({onJoinRoom}: {onJoinRoom?: (roomName: string) => void}) {
    const [isOpen, setIsOpen] = useState(false);
    const handleJoinRoom = (roomName: string) => {
        onJoinRoom?.(roomName);
        setIsOpen(false);
    };
    return (
        <>
            <button className='btn btn-sm btn-outline-secondary flex-fill'
                onClick={() => setIsOpen(true)}>
                Vào phòng
            </button>
            <InputModal
                title="Vào phòng chat nhiều người"
                placeholder="Nhập tên phòng"
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSubmit={handleJoinRoom}
            />
        </>
        );
}