import {store} from "../store/Store";
import {onEvent, onOpen, send} from "./ChatSocket";
import {loginSuccess, logout, setError, setPendingUser, setSuccess} from "../store/slice/AuthSlice";

function saveSession(user: string, code: string){
    localStorage.setItem("session", JSON.stringify({user: user, code: code}));
}
onOpen(()=>{
    const saved = localStorage.getItem("session");
    if(!saved){
        return;
    }
    const session = JSON.parse(saved);
    store.dispatch(setPendingUser(session.user));
    send("RE_LOGIN", {user: session.user, code: session.code});
});

onEvent("REGISTER", (res)=>{
    if(res.status === "success"){
        store.dispatch(setSuccess("Đăng ký thành công, hãy đăng nhập"));
    }else{
        store.dispatch(setError(res.mes));
    }
});

onEvent("LOGIN", (res)=>{
    if(res.status === "success"){
        saveSession(store.getState().auth.pendingUser, res.data.RE_LOGIN_CODE);
        store.dispatch(loginSuccess(res.data.RE_LOGIN_CODE));
    }else{
        store.dispatch(setError(res.mes));
    }
});

onEvent("RE_LOGIN", (res)=>{
    if(res.status === "success"){
        saveSession(store.getState().auth.pendingUser, res.data.RE_LOGIN_CODE);
        store.dispatch(loginSuccess(res.data.RE_LOGIN_CODE));
        send("GET_USER_LIST");
    }else{
        localStorage.removeItem("session");
        store.dispatch(logout());
    }
});