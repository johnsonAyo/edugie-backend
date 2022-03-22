"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multerImageUpload_1 = __importDefault(require("./../utils/multerImageUpload"));
const categoryController_1 = require("./../controllers/categoryController");
const router = express_1.default.Router();
// Protect all routes after this middleware
router
    .route("/")
    .get(categoryController_1.getAllCategory)
    .post(multerImageUpload_1.default.single("icon"), categoryController_1.createCategory);
router
    .route("/:id")
    .get(categoryController_1.getCategory)
    .delete(categoryController_1.deleteCategory)
    .patch(categoryController_1.updateCategory);
exports.default = router;
