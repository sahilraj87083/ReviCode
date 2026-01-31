import { useEffect, useState } from "react";
import { useSocketContext } from "../contexts/socket.context";

export const useContestChat = ({contestId, phase}) => {
    const { socket } = useSocketContext();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.emit('contest:join', {contestId})

        const handler = (msg) => {
            setMessages((prev) => [...prev, msg]);
        };

        socket.on("contest:receive", handler);

        return () => {
            socket.off("contest:receive", handler);
        };


    }, [contestId, phase])

    const send = ({message , phase}) => {
        socket.emit("contest:send" , {contestId, message, phase})
    }

    return {messages, send}
}