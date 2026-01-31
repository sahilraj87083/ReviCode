import dotenv from 'dotenv'
dotenv.config({
    path : './.env'
})
import http from "http";
import { initializeSocket } from "./sockets/index.js";

import connectDB from './db/connectDB.js';
import { app } from "./app.js";

const port = process.env.PORT || 3000
const server = http.createServer(app);

initializeSocket(server);

connectDB()
.then(() => {
    server.listen(port , () => {
        console.log(`server is listening on port number ${port}`)
    })
})
.catch((error) => {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);  
})