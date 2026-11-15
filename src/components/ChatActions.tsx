import {useState} from 'react';
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
    const handleCreateRoom = (roomName: string) => {
        onCreateRoom?.(roomName);
        setIsOpen(false);
    }
    return (
        <>
            <button className='btn btn-sm btn-outline-success flex-fill'
                onClick={() => setIsOpen(true)}>
                Tạo phòng
            </button>
            <InputModal
                title="Tạo phòng chat nhiều người"
                placeholder="Nhập tên phòng"
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
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