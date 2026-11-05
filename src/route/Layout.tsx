import {useEffect} from "react";
import {useSelector} from "react-redux";
import {Outlet} from "react-router-dom";
import {connect} from "../service/ChatSocket";

export function Layout(){
    const connected = useSelector((state:any)=>state.socket.connected);

    useEffect(()=>{
        connect().catch(()=>{});
    },[]);

    return(
        <div>
            {/* Các trang con */}
            <Outlet/>
            <span className={'badge position-fixed bottom-0 end-0 m-2 ' + (connected ? 'bg-success' : 'bg-danger')}>
                {connected ? 'Đã kết nối' : 'Mất kết nối'}
            </span>
        </div>
    )
}
