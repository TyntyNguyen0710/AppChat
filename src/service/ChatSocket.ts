import { store } from "../store/Store";
import { setConnected } from "../store/slice/SocketSlice";

const URL = "wss://chat.longapp.io.vn/chat/chat";

let socket: WebSocket | null = null;
let connecting: Promise<void> | null = null;

// list const xử lý theo api, handlers["LOGIN"] = [fn1, fn2]
const handlers: any = {};
const openHandlers: any[] = [];

export function onEvent(event: string, handler: (res: any) => void) {
    if (!handlers[event]) {
        handlers[event] = [];
    }
    handlers[event].push(handler);
}

export function onOpen(handler: () => void) {
    openHandlers.push(handler);
}

export function connect() {
    if (socket && socket.readyState === WebSocket.OPEN) {
        return Promise.resolve();
    }
    if (connecting) {
        return connecting;
    }
    connecting = new Promise<void>((resolve, reject) => {
        const ws = new WebSocket(URL);
        ws.onopen = () => {
            socket = ws;
            connecting = null;
            store.dispatch(setConnected(true));
            openHandlers.forEach((fn) => fn());
            resolve();
        };
        ws.onerror = () => {
            connecting = null;
            reject();
        };
        ws.onmessage = (e) => {
            handleMessage(e.data);
        };
        ws.onclose = () => {
            if (socket === ws) {
                socket = null;
            }
            store.dispatch(setConnected(false));
            setTimeout(() => {
                connect().catch(() => { });
            }, 3000);
        };
    });
    return connecting;
}

export function send(event: string, data?: any) {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        return false;
    }
    const payload: any = { event: event };
    if (data) {
        payload.data = data;
    }
    console.log("->", payload);
    socket.send(JSON.stringify({ action: "onchat", data: payload }));
    return true;
}

function handleMessage(raw: string) {
    let res: any;
    try {
        res = JSON.parse(raw);
    } catch (e) {
        console.log("Dữ liệu không phải JSON:", raw);
        return;
    }
    console.log("<-", res);
    const list = handlers[res.event];
    if (list) {
        list.forEach((fn: any) => fn(res));
    }
}
