let text = document.querySelector("#chat");
let sendButton = document.querySelector("#sendButton");
let resetButton = document.querySelector("#resetButton");
let textMessage = document.querySelector("#textMessage");

let usersConnected = document.getElementById("counter");
let numClicksText = document.getElementById("clicksTxt");

let ClicksUserText = document.getElementById("totalClicksUser");
let ClicksUser = 0;
let totalUsers = document.getElementById("totalUsers");
let flag = 0;
let averageclickText = document.getElementById("averageClicksUser");

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

    usersConnected.innerText //= data.usersConnected;//
    totalUsers.innerText = data.usersConnected;
});

socket.on("usuario desconectado", (data) => {
    const d = document.createElement("div");
    d.classList.add("joined");
    const t = document.createTextNode(
        "El usuario " + data.username + " se ha desconectado!"
    );
    d.appendChild(t);
    text.appendChild(d);

    usersConnected.innerText;
    totalUsers.innerText = data.usersConnected;
});

socket.on("connect", () => {
    socket.emit("iam", urlParams.get("user"));
    //totalUsers.innerText = data.usersConnected;
});

socket.on("numero de usuarios", (data) => {
    usersConnected.innerText = data.usersConnected;
    totalUsers.innerText = data.usersConnected;
    numClicksText.innerHTML = data.numClicks;
    ClicksUserText.innerHTML = ClicksUser;

    let average = ClicksUser * 100 / data.numClicks;
    averageclickText.innerHTML = average.toFixed(2);
});
socket.on("new click", (data) => {
    numClicksText.innerText = data.numClicks;
    ClicksUser++;
    ClicksUserText.innerText = ClicksUser;
    
    let average = ClicksUser * 100 / data.numClicks;
    averageclickText.innerHTML = average.toFixed(2);
});

sendButton.onclick = () => {
    socket.emit("click", "");
};

resetButton.onclick = () => {
    ClicksUser = 0;
    ClicksUserText.innerText = ClicksUser;
};
