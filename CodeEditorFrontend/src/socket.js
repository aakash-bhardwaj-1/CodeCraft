import { io } from "socket.io-client";
import { REACT_APP_BACKEND_URL } from "./config";

export const initSocket = async () => {
	const options = {
		"force new connection": true,
		reconnectionAttempt: "Infinity",
		timeout: 10000,
		transports: ["websocket"],
	};
	return io(REACT_APP_BACKEND_URL, options);
};
