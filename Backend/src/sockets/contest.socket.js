import {
  createContestMessageService,
  createSystemMessageService,
} from "../services/contestMessage.service.js";

export const ContestSocket = (io, socket) => {

    /* ===============================
        PRESENCE ROOMS (NO CHAT)
    =============================== */

    socket.on("contest:lobby:join", ({ contestId }) => {
        socket.join(`contest:${contestId}:lobby`);
    });

    socket.on("contest:lobby:leave", ({ contestId }) => {
        socket.leave(`contest:${contestId}:lobby`);
    });

    socket.on("contest:live:join", ({ contestId }) => {
        socket.join(`contest:${contestId}:live`);
    });

    socket.on("contest:live:leave", ({ contestId }) => {
        socket.leave(`contest:${contestId}:live`);
    });


    /* ===============================
        CHAT ROOM (SHARED)
    =============================== */

    socket.on("contest:chat:join", ({ contestId }) => {
        socket.join(`contest:${contestId}:chat`);
    });

    socket.on("contest:chat:leave", ({ contestId }) => {
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
