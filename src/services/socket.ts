import { Socket } from "dgram";

const handler = (socket: Socket) => {
  socket.on("connection", (socket) => {
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export default handler;
