
export default function Message({body, state}) {
    const {role, content} = body;
    return (
        <div className={"message " + (state==='pending'?'tempMsg':'')} sender={role}>
            <span className="senderLabel">{role}</span>
            <p className="messageText">{content}</p>
        </div>
    )

}