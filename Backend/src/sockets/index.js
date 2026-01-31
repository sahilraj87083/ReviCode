import { Server } from "socket.io";
import { socketAuthMiddleware } from "./socket.auth.js";
import { registerSocketHandlers } from "./registerSocketHandlers.js";

let io;

/**
 * Initialize socket server
 */

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL,
            // methods: ["GET", "POST"],
            credentials: true,
        },
    });
    io.use(socketAuthMiddleware); 

    registerSocketHandlers(io)
};

/**
 * Emit event to all users in contest
 */
const emitToContest = (contestId, event, data) => {
    if (!io) {
        console.log("Socket.io not initialized");
        return;
    }

    io.to(contestId.toString()).emit(event, data);
};

/**
 * Emit event to specific socket
 */
const emitToSocket = (socketId, event, data) => {
    if (!io) {
        console.log("Socket.io not initialized");
        return;
    }

    io.to(socketId).emit(event, data);
};

export {
  initializeSocket,
  emitToContest,
  emitToSocket,
  io
};
