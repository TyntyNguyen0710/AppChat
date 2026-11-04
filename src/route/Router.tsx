import {createBrowserRouter} from "react-router-dom";
import {Layout} from "./Layout";
import {Error} from "./Error";
import {Login} from "../pages/Login";
import {Register} from "../pages/Register";
import {Chat} from "../pages/Chat";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        errorElement:<Error/>,
        children:[
            {
                index:true,
                element:<Chat/>,
            },
            {
                path:"login",
                element:<Login/>,
            },
            {
                path:"register",
                element:<Register/>,
            }
        ]
    }
])
