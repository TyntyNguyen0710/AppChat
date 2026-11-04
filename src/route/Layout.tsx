import {Outlet} from "react-router-dom";

export function Layout(){
    return(
        <div>
            {/* Các trang con */}
            <Outlet/>
        </div>
    )
}
