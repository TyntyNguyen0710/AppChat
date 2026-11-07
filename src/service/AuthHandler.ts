import {store} from "../store/Store";
import {onEvent} from "./ChatSocket";
import {loginSuccess, setError, setSuccess} from "../store/slice/AuthSlice";

onEvent("REGISTER", (res)=>{
    if(res.status === "success"){
        store.dispatch(setSuccess("Đăng ký thành công, hãy đăng nhập"));
    }else{
        store.dispatch(setError(res.mes));
    }
});

onEvent("LOGIN", (res)=>{
    if(res.status === "success"){
        store.dispatch(loginSuccess(res.data.RE_LOGIN_CODE));
    }else{
        store.dispatch(setError(res.mes));
    }
});