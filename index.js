const WEBHOOK_URL = "https://danielaakerman.app.n8n.cloud/webhook/20407d9f-5c87-4c8d-bc0d-eb456235bd85"

let sessionId = localStorage.getItem("sessionId")
if (!sessionId) {
    sessionId = crypto.randomUUID()
    localStorage.setItem("sessionId", sessionId)
}

async function sendMessage() {
    const input = document.getElementById("input")
    const chat = document.getElementById("chat")

    const message = input.value.trim()
    if (!message) return

    chat.innerHTML += `<div><strong>You:</strong> ${message}</div>`
    chat.scrollTo({
        top: chat.scrollHeight,
        behavior: "smooth"
    });
    input.value = ""

    const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chatInput: message,
            sessionId: sessionId
        })
    })

    const data = await response.json()
    //   console.log("RESPONSE:", data)

    //   chat.innerHTML += `<div><strong>Carrie:</strong> ${data.reply}</div>`
    chat.innerHTML += `<div><strong>Carrie:</strong> ${data[0].output}</div>`
    // chat.scrollTop = chat.scrollHeight;

    chat.scrollTo({
        top: chat.scrollHeight,
        behavior: "smooth"
    });
}

window.handleSubmit = function (event) {
    event.preventDefault()
    sendMessage()
}