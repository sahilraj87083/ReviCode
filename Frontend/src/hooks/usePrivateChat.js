import { useState, useEffect, useCallback, useRef } from "react";
import { useSocketContext } from '../contexts/socket.context.jsx'
import { getPrivateMessagesService } from "../services/privateMessage.services.js";
import { useUserContext } from "../contexts/UserContext";

export const usePrivateChat = ({ otherUserId }) => {
    const { socket } = useSocketContext()
    const [messages, setMessages] = useState([])
    const { user } = useUserContext();
    const [isTyping, setIsTyping] = useState(false);

    const seenRef = useRef(false);

    useEffect(() => {
        if (!socket || !otherUserId || messages.length === 0) return;
        if (seenRef.current) return;

        const unreadIds = messages
            .filter(m => !m.fromMe && m.status !== "read")
            .map(m => m.id);

        if (unreadIds.length > 0) {
            socket.emit("private:seen", {
                messageIds: unreadIds,
                otherUserId
            });
        }

        seenRef.current = true;
    }, [messages, otherUserId, socket]);


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


    useEffect(() => {
        if (!otherUserId) return;

        seenRef.current = false;


        setMessages([]);

        const fetchAllMessages = async () => {
            const res = await getPrivateMessagesService(otherUserId);
            if (res && res.length > 0) {
                const normalized = res.map(normalizePrivateMessage);
                setMessages(normalized);
            }
        };

        fetchAllMessages();

        const activeRoom = otherUserId
            ? `private:${[user._id, otherUserId].sort().join(":")}`
            : null;


        socket.emit('private:join' , { otherUserId });
        const typingHandler = (fromUserId) => {
        if (String(fromUserId) !== String(otherUserId)) return;
            setIsTyping(true);

            // auto clear after 1.5s
            setTimeout(() => setIsTyping(false), 1500);
        };

        socket.on("private:typing", typingHandler);


        const handler = (msg) => {
            if (msg.conversationId !== activeRoom) return;

            const normalized = normalizePrivateMessage(msg);

            setMessages(prev => {
                //  DEDUPE BY MESSAGE ID
                if (prev.some(m => m.id === normalized.id)) {
                    return prev;
                }
                return [...prev, normalized];
            });
        };


        socket.on('private:receive', handler)

        return () => {
            socket.off("private:receive", handler);
            socket.off("private:typing", typingHandler);
            socket.emit("private:leave", { otherUserId });
        };


    }, [otherUserId])

    const send = ( message ) => {
        if (!message?.trim()) return;
        socket.emit("private:send", { to: otherUserId, message });
    }

    return { messages, send,  isTyping };
}