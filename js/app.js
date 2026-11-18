const API_KEY = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent"; 

const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");

async function sendBtn() {

    const text = input.value.trim();

    if (text === "") {
        return;
    }

    // User message
    const userMessage = document.createElement("div");

    userMessage.className = "user-message";
    userMessage.textContent = text;

    chatBox.appendChild(userMessage);

    input.value = "";

    // Loading message
    const botMessage = document.createElement("div");

    botMessage.className = "bot-message";
    botMessage.textContent = "Typing...";

    chatBox.appendChild(botMessage);

    chatBox.scrollTop = chatBox.scrollHeight;

 try {

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${API_KEY}`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: text
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error?.message || "API Error");
        }

        
        botMessage.textContent = result.candidates[0].content.parts[0].text;

    } catch (error) {

        botMessage.textContent = "Something went wrong!";

        console.log(error);

    }
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Enter key
input.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        sendBtn();
    }

});