//GET_USER_LIST
const conversations = [
    {name: 'LONG-room', type: 1, actionTime: '2026-11-02 10:00:00'},
    {name: 'ti', type: 0, actionTime: '2026-11-02 09:30:00'},
];

export function Sidebar(){
    return(
        <div className='d-flex flex-column vh-100'>
            <div className='p-3 bg-primary text-white'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='fw-bold'>username</div>
                    <button className='btn btn-sm btn-light'>Đăng xuất</button>
                </div>
            </div>

            <div className='p-2 d-flex gap-2'>
                <button className='btn btn-sm btn-outline-primary flex-fill'>Chat mới</button>
                <button className='btn btn-sm btn-outline-success flex-fill'>Tạo phòng</button>
                <button className='btn btn-sm btn-outline-secondary flex-fill'>Vào phòng</button>
            </div>

            <div className='list-group list-group-flush overflow-auto flex-grow-1' style={{minHeight:0}}>
                {conversations.map((item)=>(
                    <button key={item.name} className='list-group-item list-group-item-action'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <b>{item.name}</b>
                            <span className={'badge ' + (item.type === 1 ? 'bg-success' : 'bg-secondary')}>
                                {item.type === 1 ? 'Phòng' : '1-1'}
                            </span>
                        </div>
                        <small>{item.actionTime}</small>
                    </button>
                ))}
            </div>
        </div>
    )
}
