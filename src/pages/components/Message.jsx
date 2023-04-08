
export default function Message({body}) {
    const {text, sender} = body;
    return (
        <div className="message">
            <span className="senderLabel">{sender}</span>
            <p className="messageText">{text}</p>
        </div>
    )

}