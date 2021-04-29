let text = document.querySelector("#chat");
let sendButton = document.querySelector("#sendButton");
let textMessage = document.querySelector("#textMessage");

let usersConnected = document.getElementById("counter");
let numClicksText = document.getElementById("clicksTxt");

let ClicksUserText = document.getElementById("totalClicksUser");
let ClicksUser = 0;

const urlParams = new URLSearchParams(window.location.search);

const socket = io();

socket.on("message", (data) => {
    const d = document.createElement("div");
    const t = document.createTextNode(data.username + ": " + data.message);
    d.appendChild(t);
    text.appendChild(d);
});

socket.on("usuario conectado", (data) => {
    const d = document.createElement("div");
    d.classList.add("joined");
    const t = document.createTextNode(
        "El usuario " + data.username + " se ha conectado"
    );
    d.appendChild(t);
    text.appendChild(d);

    usersConnected.innerText = data.usersConnected;
});

socket.on("usuario desconectado", (data) => {
    const d = document.createElement("div");
    d.classList.add("joined");
    const t = document.createTextNode(
        "El usuario " + data.username + " se ha desconectado!"
    );
    d.appendChild(t);
    text.appendChild(d);

    usersConnected.innerText = data.usersConnected;
});

socket.on("connect", () => {
    socket.emit("iam", urlParams.get("user"));
});

socket.on("numero de usuarios", (data) => {
    usersConnected.innerText = data.usersConnected;
    numClicksText.innerHTML = data.numClicks;
    ClicksUserText.innerHTML = ClicksUser;
});
socket.on("new click", (data) => {
    numClicksText.innerText = data.numClicks;
    ClicksUser++;
    ClicksUserText.innerText = ClicksUser;
});

sendButton.onclick = () => {
    socket.emit("click", "");
};
