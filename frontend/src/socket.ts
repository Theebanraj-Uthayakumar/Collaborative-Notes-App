import { io } from "socket.io-client";

const socket = io("http://localhost:7001");

export default socket;