import { useEffect, useState, useCallback , useRef} from "react";
import { useSocketContext } from "../contexts/socket.context";
import { useUserContext } from "../contexts/UserContext";
import { getMessageService } from "../services/contestMessage.services";

export const useContestChat = ({ contestId, phase }) => {
    const { socket } = useSocketContext();
    const { user } = useUserContext();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchedRef = useRef(false);

    const normalize = useCallback(
        (msg) => ({
            id: msg._id,
            text: msg.message,
            sender: msg.senderId,
            senderId: msg.senderId._id || msg.senderId, 
            fromMe: String(msg.senderId._id || msg.senderId) === String(user?._id),
            type: msg.messageType || "text",
            createdAt: msg.createdAt,
        }),
        [user?._id]
    );

    const fetchInitialMessages = async (contestId) => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;
        try {
            setLoading(true);
            const msg = await getMessageService(contestId);

            const normalized = msg.map(normalize);
            setMessages(normalized);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!socket || !contestId) return;

        socket.emit("contest:chat:join", { contestId });
        fetchInitialMessages(contestId);

        const handler = (msg) => {
            setMessages((prev) => [...prev, normalize(msg)]);
        };

        socket.on("contest:receive", handler);

        return () => {
            socket.emit("contest:chat:leave", { contestId });
            socket.off("contest:receive", handler);
        };
    }, [contestId, socket, normalize]);

    const send = (message) => {
        if (!message?.trim()) return;
        socket.emit("contest:message", { contestId, message, phase });
    };

    return { messages, send, loading };
};
