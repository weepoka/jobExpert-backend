"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomUID = void 0;
const model_1 = require("../modules/auth/model");
const generateRandomUID = () => __awaiter(void 0, void 0, void 0, function* () {
    const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const uidLength = 6;
    const maxAttempts = 10;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        let uid = "";
        for (let i = 0; i < uidLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            uid += characters[randomIndex];
        }
        const existingUser = yield model_1.User.findOne({ uid });
        if (!existingUser) {
            return uid;
        }
    }
    throw new Error("Failed to generate a unique UID after maximum attempts.");
});
exports.generateRandomUID = generateRandomUID;
