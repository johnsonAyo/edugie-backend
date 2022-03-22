"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserBidding = exports.getBidding = exports.getAllBidding = exports.acceptBidding = exports.deleteBidding = exports.getAllErrandBids = exports.createBidding = void 0;
const BiddingModel_1 = __importDefault(require("../models/BiddingModel"));
const ErrandModel_1 = __importDefault(require("../models/ErrandModel"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const handlerFactory_1 = require("./handlerFactory");
const deleteBidding = (0, handlerFactory_1.deleteOne)(BiddingModel_1.default);
exports.deleteBidding = deleteBidding;
const getAllBidding = (0, handlerFactory_1.getAll)(BiddingModel_1.default);
exports.getAllBidding = getAllBidding;
const getBidding = (0, handlerFactory_1.getOne)(BiddingModel_1.default, "");
exports.getBidding = getBidding;
const getAllUserBidding = (0, handlerFactory_1.getAllByUser)(BiddingModel_1.default);
exports.getAllUserBidding = getAllUserBidding;
exports.createBidding = (0, catchAsync_1.default)(async (req, res, next) => {
    let isBidded = await BiddingModel_1.default.findOne({
        userId: req.user._id,
        errandId: req.params.errandId,
    });
    if (isBidded)
        return next((0, appError_1.default)(401, "You already Bid for this Errand", {}));
    const errand = await ErrandModel_1.default.findById({ errandId: req.params.errandId });
    if (errand.user == req.user._id)
        return next((0, appError_1.default)(401, "You cannot bid for your Errand", {}));
    const newBid = await BiddingModel_1.default.create({
        errandId: req.params.errandId,
        userId: req.user._id,
    });
    res.status(201).json({
        status: "success",
        data: {
            data: newBid,
        },
    });
});
exports.getAllErrandBids = (0, catchAsync_1.default)(async (req, res, next) => {
    let errandBids = await BiddingModel_1.default.find({
        errandId: req.params.errandId,
    });
    if (!errandBids)
        return next((0, appError_1.default)(401, "This errand has no bids", {}));
    res.status(201).json({
        status: "success",
        data: {
            data: errandBids,
        },
    });
});
const acceptBidding = (0, catchAsync_1.default)(async (req, res, next) => {
    const bidding = await BiddingModel_1.default.findById(req.params.id);
    if (!bidding)
        return next((0, appError_1.default)(404, "bidding does not exist", {}));
    const errand = await ErrandModel_1.default.findById(bidding.errandId);
    if (!errand)
        return next((0, appError_1.default)(404, "errand does not exist", {}));
    console.log({ e: errand.user, a: req.user._id });
    if (errand.user + "" != req.user._id + "")
        return next((0, appError_1.default)(404, "You cannot accept this bid because you are not the errand owner", {}));
    await bidding.updateOne({
        status: "Accepted",
    });
    await errand.updateOne({
        status: "Accepted",
        acceptedAt: Date.now(),
    });
    await BiddingModel_1.default.updateMany({
        userId: { $ne: bidding.userId },
        errandId: errand._id,
    }, {
        status: "Rejected",
    });
    const updatedErrand = await ErrandModel_1.default.findOne({ _id: req.params.id });
    res.status(201).json({
        status: "success",
        data: {
            data: updatedErrand,
        },
    });
});
exports.acceptBidding = acceptBidding;
