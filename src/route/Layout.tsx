import {Outlet} from "react-router-dom";
import {useConnected} from "../hooks/useConnected";

export function Layout(){
    const connected = useConnected();

    return(
        <div>
            {/* Các trang con */}
            <Outlet/>
            {!connected && (
                <span className='badge bg-danger position-fixed top-0 end-0 m-2'>Mất kết nối</span>
            )}
        </div>
    )
}