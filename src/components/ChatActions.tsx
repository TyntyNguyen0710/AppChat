import {useState} from 'react';

// 1. Component NewChat
export function NewChat({onNewChat}: {onNewChat?: (targetUser: string) => void}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button className='btn btn-sm btn-outline-primary flex-fill'
                onClick={() => setIsOpen(true)}>
                Chat mới
            </button>
        </>
        );
}
// 2. Component CreateRoom
export function CreateRoom({onCreateRoom}: {onCreateRoom?: (roomName: string) => void}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button className='btn btn-sm btn-outline-success flex-fill'
                onClick={() => setIsOpen(true)}>
                Tạo phòng
            </button>
        </>
        );
}
// 3. Component JoinRoom
export function JoinRoom({onJoinRoom}: {onJoinRoom?: (roomName: string) => void}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button className='btn btn-sm btn-outline-secondary flex-fill'
                onClick={() => setIsOpen(true)}>
                Vào phòng
            </button>
        </>
        );
}