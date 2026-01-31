import {
  createContestMessageService,
  createSystemMessageService,
} from "../services/contestMessage.service.js";

export const ContestSocket = (io, socket) => {

    /* ===============================
        PRESENCE ROOMS (NO CHAT)
    =============================== */

    socket.on("contest:lobby:join", ({ contestId }) => {
        console.log(`${socket.userId} joined the lobby`)
        socket.join(`contest:${contestId}:lobby`);
    });

    socket.on("contest:lobby:leave", ({ contestId }) => {
        console.log(`${socket.userId} left the lobby`)
        socket.leave(`contest:${contestId}:lobby`);
    });

    socket.on("contest:live:join", ({ contestId }) => {
        console.log(`${socket.userId} joined the live`)
        socket.join(`contest:${contestId}:live`);
    });

    socket.on("contest:live:leave", ({ contestId }) => {
        console.log(`${socket.userId} left the live`)
        socket.leave(`contest:${contestId}:live`);
    });


    /* ===============================
        CHAT ROOM (SHARED)
    =============================== */

    socket.on("contest:chat:join", ({ contestId }) => {
        console.log(`${socket.userId} joined the chat`)
        socket.join(`contest:${contestId}:chat`);
    });

    socket.on("contest:chat:leave", ({ contestId }) => {
        console.log(`${socket.userId} left the chat`)
        socket.leave(`contest:${contestId}:chat`);
    });


    /* ===============================
        USER MESSAGE
    =============================== */

    socket.on(
        "contest:message",
        async ({ contestId, message, phase = "live" }) => {
            if (!message?.trim()) return;

            const saved = await createContestMessageService({
                contestId,
                senderId: socket.userId,
                message,
                phase, // lobby | live (for filtering later)
            });

            io.to(`contest:${contestId}:chat`).emit("contest:receive", saved);
        }
    );


    /* ===============================
        SYSTEM MESSAGE
    =============================== */

    socket.on(
        "contest:system",
        async ({ contestId, message, phase = "live" }) => {
            const systemMessage = await createSystemMessageService({
                contestId,
                message,
                phase,
            });

            io.to(`contest:${contestId}:chat`).emit(
                "contest:receive",
                systemMessage
            );
        }
    );
};
