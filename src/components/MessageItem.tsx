export default function MessageItem({message, isMe}){
    return(
        <div className={'d-flex mb-2 ' + (isMe ? 'justify-content-end' : 'justify-content-start')}>
            <div className={'p-2 rounded-3 ' + (isMe ? 'bg-primary text-white' : 'bg-white border')} style={{maxWidth:'70%'}}>
                <div>{message.mes}</div>
                <div className='small text-end opacity-75'>{message.createAt}</div>
            </div>
        </div>
    )
}
