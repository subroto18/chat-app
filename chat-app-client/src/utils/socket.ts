import { io } from "socket.io-client";
import { SERVER_URL } from "./server";

const socket = io(SERVER_URL); // Ensure this URL matches your backend server URL

export default socket;
