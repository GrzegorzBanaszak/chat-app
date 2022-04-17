import { io, Socket } from "socket.io-client";

const socket : Socket = io("http://192.168.0.104:3001");

export default socket