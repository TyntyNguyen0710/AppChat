import {Sidebar} from "../components/Sidebar";
import {ChatWindow} from "../components/ChatWindow";

export function Chat(){
    return(
        <div className='container-fluid'>
            <div className='row vh-100'>
                <div className='col-md-4 col-lg-3 border-end p-0'>
                    <Sidebar/>
                </div>
                <div className='col-md-8 col-lg-9 p-0'>
                    <ChatWindow/>
                </div>
            </div>
        </div>
    )
}
