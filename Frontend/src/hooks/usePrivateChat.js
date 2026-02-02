import { useState, useEffect, useCallback } from "react";
import { useSocketContext } from '../contexts/socket.context.jsx'
import { getPrivateMessagesService } from "../services/privateMessage.services.js";
import { useUserContext } from "../contexts/UserContext";

export const usePrivateChat = ({ otherUserId }) => {
    const { socket } = useSocketContext()
    const [messages, setMessages] = useState([])
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const { user } = useUserContext();

    const normalizePrivateMessage = useCallback(
        (msg) => ({
            id: msg._id,
            text: msg.message,
            sender: msg.senderId,
            senderId: msg.senderId?._id || msg.senderId,
            fromMe: String(msg.senderId?._id || msg.senderId) === String(user?._id),
            status: msg.status,
            type: "text",
            createdAt: msg.createdAt,
        }),
        [user?._id]
    );

    const loadMore = useCallback(
        async (p = 1) => {
            if (!otherUserId || !hasMore) return;

            const res = await getPrivateMessagesService(otherUserId, p);
            if (res.length === 0) {
                setHasMore(false);
                return;
            }

            const normalized = res.map(normalizePrivateMessage);
            setMessages(prev => [...normalized, ...prev]);
            setPage(p + 1);
        },
        [otherUserId, hasMore, normalizePrivateMessage]
     );


    useEffect(() => {
        if (!otherUserId) return;

        setMessages([]);
        setPage(1);
        setHasMore(true);
        loadMore(1);

        const activeRoom = otherUserId
            ? `private:${[user._id, otherUserId].sort().join(":")}`
            : null;


        socket.emit('private:join' , { otherUserId });

        const handler = (msg) => {
            if (msg.conversationId !== activeRoom) return;
            setMessages((prev) => [...prev , normalizePrivateMessage(msg) ])
        }

        socket.on('private:receive', handler)

        return () => {
            socket.emit("private:leave", { otherUserId });
        };

    }, [otherUserId, loadMore])

    const send = ( message ) => {
        if (!message?.trim()) return;
        socket.emit("private:send", { to: otherUserId, message });
    }

    return { messages, send, loadMore, hasMore };
}