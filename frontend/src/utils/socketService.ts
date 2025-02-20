import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000/api/user/projects/user-access"; // Replace with actual backend URL
let socket: Socket;

export const connectSocket = (userId: string) => {
    socket = io(SOCKET_SERVER_URL, {
        query: { userId }, // Pass userId for identifying connections
    });

    socket.on("connect", () => {
        console.log("Connected to WebSocket server");
    });

    socket.on("disconnect", () => {
        console.log("Disconnected from WebSocket server");
    });

    return socket;
};

export const getSocket = () => {
    if (!socket) {
        throw new Error("Socket not initialized. Call connectSocket first.");
    }
    return socket;
};
