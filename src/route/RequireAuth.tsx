import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

export function RequireAuth(){
    const auth = useAuth();

    if(auth.isLogin){
        return <Outlet/>
    }
    if(auth.restoring){
        return <div className='text-center mt-5'>Đang kết nối lại...</div>
    }
    return <Navigate to="/login" replace/>
}