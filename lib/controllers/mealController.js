"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeal = exports.getAllMeal = exports.createMeal = exports.updateMeal = exports.deleteMeal = void 0;
const mealModel_1 = __importDefault(require("../models/mealModel"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const handlerFactory_1 = require("./handlerFactory");
const cloudinaryImageStorage_1 = __importDefault(require("../utils/cloudinaryImageStorage"));
const updateMeal = (0, handlerFactory_1.updateOne)(mealModel_1.default);
exports.updateMeal = updateMeal;
const deleteMeal = (0, handlerFactory_1.deleteOne)(mealModel_1.default);
exports.deleteMeal = deleteMeal;
const getAllMeal = (0, handlerFactory_1.getAll)(mealModel_1.default);
exports.getAllMeal = getAllMeal;
const getMeal = (0, handlerFactory_1.getOne)(mealModel_1.default, "");
exports.getMeal = getMeal;
const createMeal = (0, catchAsync_1.default)(async (req, res, next) => {
    const { price, desc, title, category } = req.body;
    let cloudImage = await cloudinaryImageStorage_1.default.uploader.upload(req.file.path);
    let createCategory = await mealModel_1.default.create({
        price,
        desc,
        title,
        category,
        img: cloudImage.secure_url,
        cloudinary_id: cloudImage.public_id,
    });
    res.status(201).json({
        status: "success",
        data: {
            data: createCategory,
        },
    });
});
exports.createMeal = createMeal;
