import { createPrivateMessageService } from "../services/privateMessage.service.js";
import { getPrivateRoom } from "../utils/getPrivateRoom.js";
import mongoose from "mongoose";
import { PrivateMessage } from "../models/privateMessage.model.js";

export const PrivateSocket = (io, socket) => {
    
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

        // notify both users
       io.to(room).emit("private:receive", saved)
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