import { useState, useEffect } from "react";
import { useSocketContext } from '../contexts/socket.context.jsx'

export const usePrivateChat = ({ otherUserId }) => {
    const { socket } = useSocketContext()
    const [messages, setMessages] = useState([])

    useEffect(() => {
        socket.emit('private:join' , { otherUserId });

        const handler = (msg) => {
            setMessages((prev) => [...prev, msg])
        }

        socket.on('private:receive', handler)

        return () => {
            socket.off("private:receive", handler);
        };

    }, [otherUserId])

    const send = ( message ) => {
        socket.emit("private:send", { to: otherUserId, message });
    }

    return { messages, send };
}