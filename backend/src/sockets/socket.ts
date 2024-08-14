import { Server } from "socket.io";

function setupSocket(server: any): void {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinNote", (noteId) => {
      socket.join(noteId);
      console.log("User joined note:", noteId);
    });

    socket.on("noteUpdate", (data) => {
      io.to(data.noteId).emit("noteUpdate", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}

export default setupSocket;
