import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import { errorHandler, notFoundHandler } from "middlewares/error.middleware";
import morgan from "morgan";
import path from "path";
import router from "routes/index";
import { createServer } from "http";
import { Server } from "socket.io";
import handler from "./socket";

const app: Express = express();
const STATIC_PATH = path.resolve(__dirname, "../../public");
const VIEWS_PATH = path.resolve(__dirname, "../../client");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(STATIC_PATH));
app.use(express.static(VIEWS_PATH));
app.use(cors());

app.use(helmet());
app.use(morgan("combined"));

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(VIEWS_PATH, "index.html"));
});

app.use(notFoundHandler);
app.use(errorHandler);

const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

handler(io as any);

export default server;
