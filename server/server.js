const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const randomColor = require("randomcolor");
const createBoard = require("./create-board");
const { printHello, maxDays } = require("./utils/hello-world");

//console.log("line 7" + printHello());
//console.log("Max days is equals to " + maxDays);

const { clear, getBoard, makeTurn } = createBoard();

//const {printHello} = helloWorld();
//const helloWorld = helloWorld().helloWorld
const app = express();

app.use(express.static(`${__dirname}/../client`));

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (sock) => {
  //printHello();

  const color = randomColor();

  //console.log('connected to a server');
  sock.emit("board", getBoard());

  sock.on("clientText", (text) => {
    io.emit("msg", text);
  });

  sock.on("turn", ({ x, y }) => {
    //console.log(`turn ${x}, ${y}`)
    makeTurn(x, y, color);
    io.emit("drawRec", { x, y, color });
  });
});

server.on("error", (err) => {
  console.error(err);
});

server.listen(8080, () => {
  //printHello();
  console.log("server is ready");
});
