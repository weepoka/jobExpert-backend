"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const error_middleware_1 = require("../middlewares/error.middleware");
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("../routes/index"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const socket_1 = __importDefault(require("./socket"));
const app = (0, express_1.default)();
const STATIC_PATH = path_1.default.resolve(__dirname, "../../public");
const VIEWS_PATH = path_1.default.resolve(__dirname, "../../client");
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(STATIC_PATH));
app.use(express_1.default.static(VIEWS_PATH));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("combined"));
app.use("/api", index_1.default);
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(VIEWS_PATH, "index.html"));
});
app.use(error_middleware_1.notFoundHandler);
app.use(error_middleware_1.errorHandler);
const server = (0, http_1.createServer)(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
(0, socket_1.default)(exports.io);
exports.default = server;
