
export default function Message({body}) {
    const {role, content} = body;
    if (role === "system") {
        return null;
    }
    return (
        <div className="message">
            <span className="senderLabel">{role}</span>
            <p className="messageText">{content}</p>
        </div>
    )

}