import { createPrivateMessageService } from "../services/privateMessage.service.js";
import { getPrivateRoom } from "../utils/getPrivateRoom.js";
import mongoose from "mongoose";
import { PrivateMessage } from "../models/privateMessage.model.js";

export const PrivateSocket = (io, socket) => {

    // 1. Join a personal room for global notifications (Inbox updates)
    if (socket.userId) {
        socket.join(socket.userId.toString());
    }
    
    socket.on('private:join', ({otherUserId}) => {
        if (!socket.userId) return;
        if (!mongoose.isValidObjectId(otherUserId)) return;
        console.log(`user : ${otherUserId} joined private chat`)

        const room = getPrivateRoom(socket.userId, otherUserId);
        socket.join(room)
    });

    socket.on("private:leave", ({ otherUserId }) => {
        const room = getPrivateRoom(socket.userId, otherUserId);
        socket.leave(room);
    });


    socket.on("private:send" , async ({to, message}) => {

        if (!socket.userId) return;
        if (!mongoose.isValidObjectId(to)) return;
        if (!message?.trim()) return;

        const saved = await createPrivateMessageService({
            senderId : socket.userId,
            to : to,
            message : message
        })

       const room = getPrivateRoom(socket.userId, to);
        // notify sender: delivered 
       socket.emit("private:delivered", saved._id);

        // notify both users in the specific chat room (for the Chat Window)
       io.to(room).emit("private:receive", saved)

       // 2. EMIT INBOX UPDATE to both users' personal rooms
       // This updates the sidebar for both the sender (to show "You: ...") and receiver
       const inboxUpdate = {
           senderId: socket.userId,
           receiverId: to,
           message: saved.message,
           createdAt: saved.createdAt,
           // We pass the populated sender object so the frontend can create a new chat item if needed
           sender: saved.senderId 
       };

       io.to(to.toString()).emit("inbox:update", inboxUpdate);
       io.to(socket.userId.toString()).emit("inbox:update", inboxUpdate);
    })

    socket.on("private:typing", ({ to }) => {
        const room = getPrivateRoom(socket.userId, to);
        socket.to(room).emit("private:typing", socket.userId);
    });

    socket.on("private:seen", async ({ messageIds, otherUserId }) => {
        if (!socket.userId) return;

        await PrivateMessage.updateMany(
            { _id: { $in: messageIds }},
            { $set: { status: "read" }}
        );

        const room = getPrivateRoom(socket.userId, otherUserId);

        // notify sender
        socket.to(room).emit("private:seen", messageIds);
    });

}