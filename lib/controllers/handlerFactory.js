"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.createOne = exports.updateOne = exports.getOne = exports.getAll = void 0;
const catchAsync_1 = __importDefault(require("./../utils/catchAsync"));
const appError_1 = __importDefault(require("./../utils/appError"));
const deleteOne = (Model) => (0, catchAsync_1.default)(async (req, res, next) => {
    var _a;
    const doc = await Model.findByIdAndDelete({
        user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        _id: req.params.id,
    });
    if (!doc || doc.length === 0) {
        return next((0, appError_1.default)(404, "No document found with that ID", {}));
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
});
exports.deleteOne = deleteOne;
const updateOne = (Model) => (0, catchAsync_1.default)(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!doc || doc.length === 0) {
        return next((0, appError_1.default)(404, "No document found with that ID", {}));
    }
    res.status(200).json({
        status: "success",
        data: {
            data: doc,
        },
    });
});
exports.updateOne = updateOne;
const createOne = (Model) => (0, catchAsync_1.default)(async (req, res, next) => {
    var _a;
    const fullBody = { ...req.body, user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id };
    const doc = await Model.create(fullBody);
    res.status(201).json({
        status: "success",
        data: {
            data: doc,
        },
    });
});
exports.createOne = createOne;
const getOne = (Model, popOptions) => (0, catchAsync_1.default)(async (req, res, next) => {
    var _a;
    console.log((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    let query = Model.findById({ _id: req.params.id }).populate("user");
    if (popOptions)
        query = query.populate("");
    const doc = await query;
    console.log(doc);
    if (!doc || doc.length === 0) {
        return next((0, appError_1.default)(404, "No document found with that ID", {}));
    }
    res.status(200).json({
        status: "success",
        data: {
            data: doc,
        },
    });
});
exports.getOne = getOne;
const getAll = (Model) => (0, catchAsync_1.default)(async (req, res, next) => {
    // To allow for nested GET reviews on trecipe (hack)
    let filter = {};
    if (req.params.userId)
        filter = { userId: req.params.userId };
    const features = Model.find(filter);
    // const doc = await features.query.explain();
    const doc = await features;
    if (!doc || doc.length === 0) {
        return next((0, appError_1.default)(404, "No document found with that ID", {}));
    }
    // SEND RESPONSE
    res.status(200).json({
        status: "success",
        results: doc.length,
        data: {
            data: doc,
        },
    });
});
exports.getAll = getAll;
