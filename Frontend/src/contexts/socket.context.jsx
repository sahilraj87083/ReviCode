import { createContext, useContext, useEffect, useRef } from "react";
import {io} from 'socket.io-client'

const SocketContext = createContext(null);

export const useSocketContext = () => {
    const ctx = useContext(SocketContext);
    if (!ctx) {
        throw new Error("useSocketContext must be used within SocketContextProvider");
    }
    return ctx;
};

export const SocketContextProvider = ({ children }) => {
    const socketRef = useRef(null);

    if (!socketRef.current) {
        socketRef.current = io({
            path: "/socket.io",
            transports: ["websocket"],
            withCredentials: true,
            autoConnect: true,
        });
    }

    useEffect(() => {
        const socket = socketRef.current;

        socket.on("connect", () => {
            console.log("🟢 Socket connected:", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("🔴 Socket disconnected");
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket: socketRef.current }}>
            {children}
        </SocketContext.Provider>
    );
};
