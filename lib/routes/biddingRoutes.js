"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const biddingController_1 = require("./../controllers/biddingController");
const authController_1 = require("./../controllers/authController");
const router = express_1.default.Router();
router.use(authController_1.protect);
// Protect all routes after this middleware
router.route("/:errandId").get(biddingController_1.getAllErrandBids).post(biddingController_1.createBidding);
router.route("/:id").get(biddingController_1.getBidding).delete(biddingController_1.deleteBidding).patch(biddingController_1.acceptBidding);
router.route("/user/:id").get(biddingController_1.getAllUserBidding);
exports.default = router;
