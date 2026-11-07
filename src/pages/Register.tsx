import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {send} from "../service/ChatSocket";
import {clearMessage, setError} from "../store/slice/AuthSlice";

export function Register(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const auth = useSelector((state:any)=>state.auth);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(clearMessage());
    },[dispatch]);

    const handleRegister=(e:any)=>{
        e.preventDefault();
        if(username.trim() === "" || password === ""){
            dispatch(setError("Vui lòng nhập đầy đủ thông tin"));
            return;
        }
        if(!/^\w+$/.test(username.trim())){
            dispatch(setError("Tên đăng nhập chỉ gồm chữ cái, số và dấu gạch dưới"));
            return;
        }
        if(password !== confirm){
            dispatch(setError("Mật khẩu nhập lại không khớp"));
            return;
        }
        if(!send("REGISTER", {user: username.trim(), pass: password})){
            dispatch(setError("Chưa kết nối được tới server"));
        }
    }

    return(
        <div className='container'>
            <div className='row justify-content-center mt-5'>
                <div className='col-md-5'>
                    <div className='card shadow-sm'>
                        <div className='card-body p-4'>
                            <h3 className='text-center mb-4'>Đăng ký</h3>
                            {auth.error && <div className='alert alert-danger'>{auth.error}</div>}
                            {auth.success && <div className='alert alert-success'>{auth.success}</div>}
                            <form onSubmit={handleRegister}>
                                <div className='mb-3'>
                                    <label className='form-label'>Tên đăng nhập</label>
                                    <input type='text' className='form-control' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Mật khẩu</label>
                                    <input type='password' className='form-control' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Nhập lại mật khẩu</label>
                                    <input type='password' className='form-control' value={confirm} onChange={(e)=>setConfirm(e.target.value)}/>
                                </div>
                                <button type='submit' className='btn btn-primary w-100'>Đăng ký</button>
                            </form>
                            <p className='text-center mt-3 mb-0'>
                                Đã có tài khoản? <Link to='/login'>Đăng nhập</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}