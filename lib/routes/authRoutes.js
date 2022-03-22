"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multerImageUpload_1 = __importDefault(require("./../utils/multerImageUpload"));
const express_1 = __importDefault(require("express"));
const authController_1 = require("./../controllers/authController");
const router = express_1.default.Router();
router.post("/signup", multerImageUpload_1.default.single("profileImage"), authController_1.signup);
router.post("/login", authController_1.login);
router.get("/logout", authController_1.logout);
exports.default = router;
