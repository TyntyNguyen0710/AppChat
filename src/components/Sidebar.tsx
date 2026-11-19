import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {useChat} from "../context/ChatContext";
import {NewChat, CreateRoom, JoinRoom} from "./ChatActions";

export function Sidebar(){
    const auth = useAuth();
    const chat = useChat();
    const navigate = useNavigate();

    const handleLogout=()=>{
        auth.logout();
        navigate("/login");
    }

    const isActive=(item:any)=>{
        return chat.current && chat.current.name === item.name && chat.current.type === item.type;
    }

    return(
        <div className='d-flex flex-column vh-100'>
            <div className='p-3 bg-primary text-white'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='fw-bold'>{auth.user}</div>
                    <button className='btn btn-sm btn-light' onClick={handleLogout}>Đăng xuất</button>
                </div>
            </div>

            <div className='p-2 d-flex gap-2'>
                <NewChat/>
                <CreateRoom onCreateRoom={chat.createRoom}/>
                <JoinRoom onJoinRoom={chat.joinRoom}/>
            </div>

            <div className='list-group list-group-flush overflow-auto flex-grow-1' style={{minHeight:0}}>
                {chat.conversations.length === 0 && (
                    <div className='text-center text-muted p-4'>Chưa có cuộc trò chuyện nào</div>
                )}
                {chat.conversations.map((item:any)=>(
                    <button key={item.type + item.name}
                            className={'list-group-item list-group-item-action' + (isActive(item) ? ' active' : '')}
                            onClick={()=>chat.selectConversation({name: item.name, type: item.type})}>
                        <div className='d-flex justify-content-between align-items-center'>
                            <b>{item.name}</b>
                            <span className={'badge ' + (item.type === 1 ? 'bg-success' : 'bg-secondary')}>
                                {item.type === 1 ? 'Phòng' : '1-1'}
                            </span>
                        </div>
                        <small>{item.actionTime}</small>
                    </button>
                ))}
            </div>
        </div>
    )
}