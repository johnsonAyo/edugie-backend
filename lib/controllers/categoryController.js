"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategory = exports.getAllCategory = exports.createCategory = exports.updateCategory = exports.deleteCategory = void 0;
const CategoryModel_1 = __importDefault(require("../models/CategoryModel"));
const catchAsync_1 = __importDefault(require("./../utils/catchAsync"));
const handlerFactory_1 = require("./handlerFactory");
const cloudinaryImageStorage_1 = __importDefault(require("../utils/cloudinaryImageStorage"));
const updateCategory = (0, handlerFactory_1.updateOne)(CategoryModel_1.default);
exports.updateCategory = updateCategory;
const deleteCategory = (0, handlerFactory_1.deleteOne)(CategoryModel_1.default);
exports.deleteCategory = deleteCategory;
const getAllCategory = (0, handlerFactory_1.getAll)(CategoryModel_1.default);
exports.getAllCategory = getAllCategory;
const getCategory = (0, handlerFactory_1.getOne)(CategoryModel_1.default, "");
exports.getCategory = getCategory;
const createCategory = (0, catchAsync_1.default)(async (req, res, next) => {
    const { name } = req.body;
    let cloudImage = await cloudinaryImageStorage_1.default.uploader.upload(req.file.path);
    let createCategory = await CategoryModel_1.default.create({
        name,
        icon: cloudImage.secure_url,
        cloudinary_id: cloudImage.public_id,
    });
    res.status(201).json({
        status: "success",
        data: {
            data: createCategory,
        },
    });
});
exports.createCategory = createCategory;
