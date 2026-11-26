import {createContext, useContext, useEffect, useRef, useState} from "react";
import {connect, isConnected, onEvent, onOpen, send} from "../service/ChatSocket";

const AuthContext = createContext<any>(null);

export function AuthProvider({children}: any){
    const [user, setUser] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const [restoring, setRestoring] = useState(()=>sessionStorage.getItem("session") !== null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const pendingUser = useRef("");

    useEffect(()=>{
        const saveSession = (code: string)=>{
            sessionStorage.setItem("session", JSON.stringify({user: pendingUser.current, code: code}));
        }

        const loginOk = (code: string)=>{
            saveSession(code);
            setUser(pendingUser.current);
            setIsLogin(true);
            setRestoring(false);
            setError("");
        }

        // co phien luu thi RE_LOGIN
        const restore = ()=>{
            const saved = sessionStorage.getItem("session");
            if(!saved){
                return;
            }
            const session = JSON.parse(saved);
            pendingUser.current = session.user;
            send("RE_LOGIN", {user: session.user, code: session.code});
        }

        const offs = [ 
            // moi lan ket noi thanh cong (mo app, F5, noi lai sau khi mat mang)
            onOpen(restore),
            onEvent("REGISTER", (res)=>{
                if(res.status === "success"){
                    setSuccess("Đăng ký thành công, hãy đăng nhập");
                    setError("");
                }else{
                    setError(res.mes);
                    setSuccess("");
                }
            }),
            onEvent("LOGIN", (res)=>{
                if(res.status === "success"){
                    loginOk(res.data.RE_LOGIN_CODE);
                }else{
                    setError(res.mes);
                    setSuccess("");
                }
            }),
            // re-login thanh cong thi server tra ve code re-login, khi dang nhap xong luu lai de dung cho lan sau
            onEvent("RE_LOGIN", (res)=>{
                if(res.status === "success"){
                    loginOk(res.data.RE_LOGIN_CODE);
                }else{
                    sessionStorage.removeItem("session");
                    setUser("");
                    setIsLogin(false);
                    setRestoring(false);
                }
            })
        ];
        connect().catch(()=>{});
        if(isConnected()){
            restore();
        }

        return ()=>offs.forEach((off)=>off());
    },[]);

    const showError = (message: string)=>{
        setError(message);
        setSuccess("");
    }

    const clearMessage = ()=>{
        setError("");
        setSuccess("");
    }

    const register = (username: string, password: string)=>{
        return send("REGISTER", {user: username, pass: password});
    }

    const login = (username: string, password: string)=>{
        pendingUser.current = username;
        return send("LOGIN", {user: username, pass: password});
    }

    const logout = ()=>{
        send("LOGOUT");
        sessionStorage.removeItem("session");
        pendingUser.current = "";
        setUser("");
        setIsLogin(false);
        setRestoring(false);
    }

    return(
        <AuthContext.Provider value={{user, isLogin, restoring, error, success, setError: showError, clearMessage, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}