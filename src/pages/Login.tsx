import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {send} from "../service/ChatSocket";
import {clearMessage, setError, setPendingUser} from "../store/slice/AuthSlice";

export function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const auth = useSelector((state:any)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        dispatch(clearMessage());
    },[dispatch]);

    useEffect(()=>{
        if(auth.isLogin){
            navigate("/chat");
        }
    },[auth.isLogin]);

    const handleLogin=(e:any)=>{
        e.preventDefault();
        if(username.trim() === "" || password === ""){
            dispatch(setError("Vui lòng nhập tên đăng nhập và mật khẩu"));
            return;
        }
        dispatch(setPendingUser(username.trim()));
        if(!send("LOGIN", {user: username.trim(), pass: password})){
            dispatch(setError("Chưa kết nối được tới server"));
        }
    }

    return(
        <div className='container'>
            <div className='row justify-content-center mt-5'>
                <div className='col-md-5'>
                    <div className='card shadow-sm'>
                        <div className='card-body p-4'>
                            <h3 className='text-center mb-4'>Đăng nhập</h3>
                            {auth.error && <div className='alert alert-danger'>{auth.error}</div>}
                            <form onSubmit={handleLogin}>
                                <div className='mb-3'>
                                    <label className='form-label'>Tên đăng nhập</label>
                                    <input type='text' className='form-control' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Mật khẩu</label>
                                    <input type='password' className='form-control' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                                </div>
                                <button type='submit' className='btn btn-primary w-100'>Đăng nhập</button>
                            </form>
                            <p className='text-center mt-3 mb-0'>
                                Chưa có tài khoản? <Link to='/register'>Đăng ký</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}