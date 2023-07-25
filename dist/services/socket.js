"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler = (socket) => {
    socket.on("connection", (socket) => {
        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    });
};
exports.default = handler;
