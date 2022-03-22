"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mealSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "A meal must have a title"],
        message: "Input a meal name",
    },
    img: {
        type: String,
        required: [true, "A meal must have an image"],
        message: "Input a meal name",
    },
    category: {
        type: String,
        required: [true, "A meal must have a category"],
        message: "Input a meal name",
    },
    price: {
        type: String,
        required: [true, "A meal must have a price"],
        message: "Input a meal name",
    },
    desc: {
        type: String,
        required: [true, "A meal must have a desc"],
        message: "Input a meal description",
    },
    cloudinary_id: {
        type: String,
    },
});
const Meal = mongoose_1.default.model("Meal", mealSchema);
exports.default = Meal;
