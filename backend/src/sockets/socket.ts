import { Server } from "socket.io";

let io: Server;

function setupSocket(server: any): void {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("editingDetails", (data) => {
      console.log(data);
      socket.broadcast.emit("editingDetails", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}

export { io, setupSocket };
