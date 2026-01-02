const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const shopUi = document.querySelector(".row");
console.log("########ShopUI",shopUi)

let suggestionContainer = null;
let toggleOn = true;
const inputInitHeight = chatInput.scrollHeight;

const hideSuggestions = () => {
    if (suggestionContainer) {
        suggestionContainer.remove();
        suggestionContainer = null;
    }
};

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);

    if (className === "outgoing") {
        chatLi.innerHTML = `<p></p>`;
    } else {
        chatLi.innerHTML = `
            <span class="material-symbols-outlined">
                <img src="https://res.cloudinary.com/webmonc/image/upload/v1696515089/7626850_ppkstm.png"
                     width="24" height="28" alt="bot">
            </span>
            <p></p>
        `;
    }

    chatLi.querySelector("p").textContent = message;
    return chatLi;
};

const generateResponse = (message) => {
    const chatElement = createChatLi(message, "incoming");
    chatbox.appendChild(chatElement);
    chatbox.scrollTo(0, chatbox.scrollHeight);
};

const displayShop = (data = []) => {
    while (shopUi.hasChildNodes()) {
        shopUi.removeChild(shopUi.firstChild);
    }

    if (!Array.isArray(data) || data.length === 0) return;

    data.forEach(i => {
        const col = document.createElement("div");
        col.classList.add("col");

        col.innerHTML = `
            <div id="content">
                <div class="img-container1">
                    <div class="img-container">
                        <img src="${i.image}" alt="">
                    </div>
                </div>
                <h4 id="name">${i.name}</h4>
                <div class="inner-content">
                    <p>&#36;<span>${i.price}</span></p>
                    <button class="cart-btn">Add to cart</button>
                </div>
            </div>
        `;

        shopUi.appendChild(col);
    });
};

const renderButtons = (buttons) => {
    const old = document.querySelector(".suggestions");
    if (old) old.remove();

    if (!Array.isArray(buttons) || buttons.length === 0) return;

    const container = document.createElement("div");
    container.classList.add("suggestions");

    buttons.forEach(btnData => {
        const btn = document.createElement("button");
        btn.classList.add("suggestion-btn");
        btn.innerText = btnData.title;

        btn.onclick = () => {
            hideSuggestions();
            sendMessageToServer(btnData.payload);
        };

        container.appendChild(btn);
    });

    chatbox.appendChild(container);
};



const sendMessageToServer = (data) => {
    console.log("User message:", data);

    return fetch("http://127.0.0.1:8000/message", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            chatId: 1,
            date: "date",
            conversation: data
        })
    })
    .then(res => res.json())
    .then((res) => {
    console.log("FULL RESPONSE:", res);

    if (res.message) {
        generateResponse(res.message);
    }

    if (res.extra && Array.isArray(res.extra)) {
        displayShop(res.extra);
    }

    // ✅ RASA BUTTONS (domain.yml)
    if (toggleOn && res.buttons && res.buttons.length > 0) {
        renderButtons(res.buttons);
    }

    chatbox.scrollTo(0, chatbox.scrollHeight);
    })
};

/* ===============================
   CHAT HANDLER
================================ */
const handleChat = () => {
    hideSuggestions();

    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    sendMessageToServer(userMessage);

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;
};

/* ===============================
   EVENTS
================================ */
chatInput.addEventListener("input", () => {
    hideSuggestions();
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
