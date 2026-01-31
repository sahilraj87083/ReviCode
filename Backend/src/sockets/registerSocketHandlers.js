import { PrivateSocket } from "./private.socket.js";
import { ContestSocket } from "./contest.socket.js";

export const registerSocketHandlers = (io) => {
    io.on("connection", (socket) => {
        console.log("🟢 connected:", socket.userId);

        PrivateSocket(io, socket);
        ContestSocket(io, socket);

        socket.on("disconnect", () => {
            console.log("🔴 disconnected:", socket.userId);
        });
    });
};
