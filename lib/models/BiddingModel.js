"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const biddingSchema = new mongoose_1.default.Schema({
    errandId: { type: mongoose_1.default.SchemaTypes.ObjectId, ref: "Errand" },
    userId: { type: mongoose_1.default.SchemaTypes.ObjectId, ref: "User" },
    status: { type: String, default: "pending" },
});
const Bidding = mongoose_1.default.model("Bidding", biddingSchema);
exports.default = Bidding;
