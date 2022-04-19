import { io, Socket } from "socket.io-client";

const socket : Socket = io(`${process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL}`);

export default socket