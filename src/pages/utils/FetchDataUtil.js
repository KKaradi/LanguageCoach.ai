export async function fetchMessages() {
    const mes = await new Promise(r => r(
        [
            {
                sender: "me",
                text: "text"
            },
            {
                sender: "you",
                text: "text2"
            },
        ]
    ));
    return mes
}
