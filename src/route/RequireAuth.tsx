import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";

export function RequireAuth(){
    const auth = useSelector((state:any)=>state.auth);

    if(auth.isLogin){
        return <Outlet/>
    }
    if(auth.restoring){
        return <div className='text-center mt-5'>Đang kết nối lại...</div>
    }
    return <Navigate to="/login" replace/>
}