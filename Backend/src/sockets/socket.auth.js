import jwt from "jsonwebtoken";
import cookie from "cookie";
import { ApiError } from "../utils/ApiError.utils.js";

export const socketAuthMiddleware = (socket, next) => {
    try {
        let token = socket.handshake.auth?.token;

        // fallback to cookie (BEST for your setup)
        if (!token && socket.handshake.headers.cookie) {
            const cookies = cookie.parse(socket.handshake.headers.cookie);
            token = cookies.accessToken;
        }

        if (!token) {
            return next(new ApiError("Unauthorized socket"));
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        socket.userId = decoded._id;
        socket.role = decoded.role;

        next();
    } catch (err) {
        next(new Error("Socket authentication failed"));
    }
};
