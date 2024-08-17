import http from "http";
import app from "./app";
import { setupSocket } from "./sockets/socket";

const server = http.createServer(app);
setupSocket(server);

const PORT = process.env.PORT || 7001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
