import { Server } from "socket.io";

let io;

/**
 * Initialize socket server
 */

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            // methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);

        // ===== LOBBY ROOM =====
        socket.on("join-contest-lobby", ({ contestId }) => {
            socket.join(`contest:${contestId}:lobby`);
            console.log(`Socket ${socket.id} joined lobby ${contestId}`);
        });
        socket.on("leave-contest-lobby", ({ contestId }) => {
            socket.leave(`contest:${contestId}:lobby`);
            console.log(`Socket ${socket.id} left lobby ${contestId}`);
        });

        // ===== LIVE ROOM =====
        socket.on("join-contest-live", ({ contestId }) => {
            socket.join(`contest:${contestId}:live`);
            console.log(`Socket ${socket.id} joined live ${contestId}`);
        });

        socket.on("leave-contest-live", ({ contestId }) => {
            socket.leave(`contest:${contestId}:live`);
            console.log(`Socket ${socket.id} left live ${contestId}`);
        });


        // Chat message (future)
        socket.on("contest-message", ({ contestId, message }) => {
            io.to(contestId).emit("contest-message", message);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
        });
    });
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
