//1. Package
import express from "express";
import http from "http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

//2. Instances
const app = express();
const server = http.createServer(app);
const io = new Server(server); // entire web socket

//3. Serving HTML File
const __dirname = dirname(fileURLToPath(import.meta.url));
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

//4. Define a connection event handler
// Connecting client and server....
io.on("connection", (socket) => {
  console.log("User Connected To (Server) ✔️");
  //console.log(socket);

  //Emitting a message from server to client
  socket.emit("message", "Welcome to the server"); // sends data

  //Receiving a message from client to server
  socket.on("message", (msg) => {
    console.log(msg);
  });

  // We are not disconnecting the entire server we are only disconnecting the client.
  socket.on("disconnect", () => {
    console.log("User Disconnected From (Server) ❌");
  });
});

//5. Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
