import {useSelector} from "react-redux";
import MessageItem from "./MessageItem.tsx";

//data demo, data thức lấy từ (GET_PEOPLE_CHAT_MES / GET_ROOM_CHAT_MES)
const messages = [
    { id: 1, name: 'ti', mes: 'Chào bạn nhé', createAt: '09:30' },
    { id: 2, name: 'username', mes: 'Hello bạn', createAt: '09:31' },
];

export function ChatWindow() {
    const current = useSelector((state:any)=>state.chat.current);

    if(!current){
        return (
            <div className='vh-100 d-flex align-items-center justify-content-center text-muted'>
                <h5>Chọn một cuộc trò chuyện để bắt đầu</h5>
            </div>
        )
    }

    return (
        <div className='d-flex flex-column vh-100'>
            <div className='border-bottom p-3'>
                <h5 className='mb-0'>{current.name}</h5>
                <small className='text-muted'>{current.type === 1 ? 'Phòng chat' : 'Chat 1-1'}</small>
            </div>

            <div className='flex-grow-1 overflow-auto p-3 bg-light' style={{ minHeight: 0 }}>
                {messages.map((m) => (
                    <MessageItem key={m.id} message={m} isMe={m.name === 'username'} />
                ))}
            </div>

            <div className='border-top p-3 d-flex gap-2'>
                <input type='text' className='form-control' placeholder='Nhập tin nhắn...' />
                <button className='btn btn-primary'>Gửi</button>
            </div>
        </div>
    )
}