"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multerImageUpload_1 = __importDefault(require("./../utils/multerImageUpload"));
const errandController_1 = require("./../controllers/errandController");
const authController_1 = require("./../controllers/authController");
const router = express_1.default.Router();
// Protect all routes after this middleware
router.use(authController_1.protect);
router.route("/user").get(errandController_1.getAllUserErrand);
router
    .route("/user/:id")
    .get(errandController_1.getErrand)
    .delete(errandController_1.deleteErrand)
    .patch(errandController_1.updateErrand);
router
    .route("/")
    .get(errandController_1.getAllErrand)
    .post(multerImageUpload_1.default.single("errandImage"), errandController_1.createErrand);
router.route("/:id").get(errandController_1.getErrand).patch(errandController_1.updateErrand).delete(errandController_1.deleteErrand);
router.route("/image/:errandId").patch(errandController_1.updateErrandImage);
exports.default = router;
