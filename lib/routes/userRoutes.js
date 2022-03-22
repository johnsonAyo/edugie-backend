"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("./../controllers/userController");
const authController_1 = require("./../controllers/authController");
const router = express_1.default.Router();
// Protect all routes after this middleware
router.use(authController_1.protect);
router.get("/", userController_1.getAllUser);
router.patch("/", userController_1.updateProfile);
router.get("/profile", userController_1.getProfile);
router.get("/:userId", userController_1.getUserProfile);
router.patch("/profileImage", userController_1.updateProfileImage);
exports.default = router;
