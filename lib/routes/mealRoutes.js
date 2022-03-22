"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multerImageUpload_1 = __importDefault(require("./../utils/multerImageUpload"));
const mealController_1 = require("./../controllers/mealController");
const router = express_1.default.Router();
router.route("/").get(mealController_1.getAllMeal).post(multerImageUpload_1.default.single("img"), mealController_1.createMeal);
router.route("/:id").get(mealController_1.getMeal).delete(mealController_1.deleteMeal).patch(mealController_1.updateMeal);
exports.default = router;
