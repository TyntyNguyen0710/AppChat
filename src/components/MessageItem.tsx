export default function MessageItem({message, isMe, showName}){
    return(
        <div className={'d-flex mb-2 ' + (isMe ? 'justify-content-end' : 'justify-content-start')}>
            <div className={'p-2 rounded-3 ' + (isMe ? 'bg-primary text-white' : 'bg-white border')} style={{maxWidth:'70%'}}>
                {showName && !isMe && <div className='fw-bold small'>{message.name}</div>}
                <div style={{wordBreak:'break-word'}}>{message.mes}</div>
                <div className={'small opacity-75 '+ (isMe ? 'text-end' : 'text-start')}>
                    {message.createAt ? message.createAt.slice(11,16) : ''}</div>
            </div>
        </div>
    )
}