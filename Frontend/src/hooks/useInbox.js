import { useEffect, useState, useCallback } from "react";
import { getInboxService } from "../services/privateMessage.services.js";
import { useSocketContext } from "../contexts/socket.context.jsx";
import { useUserContext } from "../contexts/UserContext"; 

export const useInbox = () => {
    const [inbox, setInbox] = useState([]);
    const [loading, setLoading] = useState(true);
    const { socket } = useSocketContext();
    const { user: currentUser } = useUserContext(); // Get current user to check "fromMe"

    // Initial Fetch
    useEffect(() => {
        setLoading(true)
        getInboxService()
            .then(data => setInbox(data))
            .finally(() => setLoading(false))
    }, [])

    // Real-time Update Handler
    const handleInboxUpdate = useCallback((newMsg) => {
        setInbox((prevInbox) => {
            // Determine the "Other User" ID
            // If I sent it, the other user is the receiver. 
            // If I received it, the other user is the sender.
            const otherUserId = newMsg.senderId === currentUser._id 
                ? newMsg.receiverId 
                : newMsg.senderId;

            // Find existing chat in the list
            const existingIndex = prevInbox.findIndex(
                chat => chat.user._id === otherUserId || chat.user._id === otherUserId.toString()
            );

            let updatedChat;
            let newList = [...prevInbox];

            if (existingIndex !== -1) {
                // CASE 1: Chat exists - update and move to top
                updatedChat = { ...newList[existingIndex] };
                updatedChat.lastMessage = newMsg.message;
                updatedChat.lastAt = newMsg.createdAt;
                
                // Only increment unread if I am the receiver (sender is not me)
                if (newMsg.senderId !== currentUser._id) {
                    updatedChat.unreadCount = (updatedChat.unreadCount || 0) + 1;
                }

                // Remove from current position 
                newList.splice(existingIndex, 1);
            } else {
                // CASE 2: New Chat - create entry
                // This usually happens when someone new messages you
                
                if (newMsg.senderId === currentUser._id) {
                    // If I sent a message to someone not in my list, we generally rely on 
                    // refreshing or 'New Users' list, but we can just return prevInbox safely.
                    return prevInbox; 
                }

                updatedChat = {
                    conversationId: null, // Generated dynamically later
                    unreadCount: 1,
                    lastMessage: newMsg.message,
                    lastAt: newMsg.createdAt,
                    // The backend sends the populated 'sender' object in the update
                    user: newMsg.sender, 
                    isNew: false
                };
            }

            // Add updated/new chat to the top of the list
            return [updatedChat, ...newList];
        });
    }, [currentUser._id]);

    useEffect(() => {
        if (!socket) return;

        socket.on("inbox:update", handleInboxUpdate);

        return () => {
            socket.off("inbox:update", handleInboxUpdate);
        };
    }, [socket, handleInboxUpdate]);

    return { inbox, loading };
}

export default useInbox;