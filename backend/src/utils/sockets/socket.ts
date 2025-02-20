import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { corsOptions } from "../../config/cors";
import { handleOwnerResponse } from "./socketHandlers";
let io: Server;

export const initializeSocket = (server: HttpServer) => {
    io = new Server(server, {
        cors: corsOptions
    });

    io.on("connection", (socket) => {
        console.log("A user connected: ", socket.id);

        handleOwnerResponse(socket);
        // Handle disconnection
        socket.on("disconnect", () => {
            console.log("A user disconnected: ", socket.id);
        });
    });
};

export const getIo = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};
