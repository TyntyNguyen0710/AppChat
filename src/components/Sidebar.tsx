import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {send} from "../service/ChatSocket";
import {logout} from "../store/slice/AuthSlice";
import {clearConversations} from "../store/slice/ConversationSlice";
import {setCurrent} from "../store/slice/ChatSlice";
import {NewChat, CreateRoom, JoinRoom} from "./ChatActions";

export function Sidebar(){
    const auth = useSelector((state:any)=>state.auth);
    const conversations = useSelector((state:any)=>state.conversation.list);
    const current = useSelector((state:any)=>state.chat.current);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        send("GET_USER_LIST");
    },[]);

    const handleLogout=()=>{
        send("LOGOUT");
        localStorage.removeItem("session");
        dispatch(logout());
        dispatch(clearConversations());
        dispatch(setCurrent(null));
        navigate("/login");
    }

    const isActive=(item:any)=>{
        return current && current.name === item.name && current.type === item.type;
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
                <CreateRoom/>
                <JoinRoom/>
            </div>

            <div className='list-group list-group-flush overflow-auto flex-grow-1' style={{minHeight:0}}>
                {conversations.length === 0 && (
                    <div className='text-center text-muted p-4'>Chưa có cuộc trò chuyện nào</div>
                )}
                {conversations.map((item:any)=>(
                    <button key={item.type + item.name}
                            className={'list-group-item list-group-item-action' + (isActive(item) ? ' active' : '')}
                            onClick={()=>dispatch(setCurrent({name: item.name, type: item.type}))}>
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