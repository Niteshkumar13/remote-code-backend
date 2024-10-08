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
exports.protectRoute = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const User_model_1 = require("../models/User.model");
const protectRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.rck;
        if (!token) {
            return res.status(401).json({ error: "Unauthorize User" });
        }
        const jwttoken = process.env.JWT_TOKEN;
        if (jwttoken) {
            const decode = (0, jsonwebtoken_1.verify)(token, jwttoken);
            if (!decode) {
                return res.status(401).json({ error: "Unauthorize User" });
            }
            const { userid } = decode;
            const user = yield User_model_1.User.findById(userid).select("-password");
            if (!user) {
                return res.status(401).json({ error: "user not found" });
            }
            req.user = user;
            next();
        }
    }
    catch (e) {
        console.log("some wrong");
        res.status(500).json({ error: "internal server error" });
    }
});
exports.protectRoute = protectRoute;
