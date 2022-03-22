"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateSignUp = exports.validateEntry = void 0;
const joi_1 = __importDefault(require("joi"));
var Meal_type;
(function (Meal_type) {
    Meal_type["Breakfast"] = "breakfast";
    Meal_type["Lunch"] = "lunch";
    Meal_type["Supper"] = "supper";
    Meal_type["Snacks"] = "snacks";
})(Meal_type || (Meal_type = {}));
var Difficulty_level;
(function (Difficulty_level) {
    Difficulty_level["Beginner"] = "beginner";
    Difficulty_level["Intermediate"] = "intermediate";
    Difficulty_level["Advanced"] = "advanced";
})(Difficulty_level || (Difficulty_level = {}));
exports.validateEntry = joi_1.default.object({
    title: joi_1.default.string().required(),
    meal_type: joi_1.default
        .string()
        .valid(Meal_type.Breakfast, Meal_type.Lunch, Meal_type.Supper, Meal_type.Snacks),
    difficulty_level: joi_1.default
        .string()
        .valid(Difficulty_level.Beginner, Difficulty_level.Intermediate, Difficulty_level.Advanced),
    ingredients: joi_1.default.array().required(),
    preparation: joi_1.default.string().required()
});
exports.validateSignUp = joi_1.default.object({
    fullname: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});
exports.validateLogin = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});
