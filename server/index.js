const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // TODO: Ganti jadi URL react-mu
        methods: ["GET", "POST"],
      },
});

io.on("connection", (socket) => {
    console.info("Info:", "seseorang telah bergabung ke chat room!");

    socket.on("chat message", (msg) => {
        io.emit("incoming message", msg);
    })

    socket.on("disconnect", () => {
        console.info("Info:", "seseorang telah pergi dari chat room!")
    })
})

app.get("/", (req, res) => {
    res.status(200).json({
        status:"OK",
        message: "Hello World",
    })
})

server.listen(8000, () => {
    console.log("Listening on port 8000");
})