"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserErrand = exports.getErrand = exports.getAllErrand = exports.createErrand = exports.updateErrand = exports.deleteErrand = exports.updateErrandImage = void 0;
const ErrandModel_1 = __importDefault(require("../models/ErrandModel"));
const catchAsync_1 = __importDefault(require("./../utils/catchAsync"));
const cloudinaryImageStorage_1 = __importDefault(require("./../utils/cloudinaryImageStorage"));
const multerImageUpload_1 = __importDefault(require("../utils/multerImageUpload"));
const multer_1 = __importDefault(require("multer"));
const appError_1 = __importDefault(require("../utils/appError"));
const upload = multerImageUpload_1.default.single("profileImage");
const handlerFactory_1 = require("./handlerFactory");
const updateErrand = (0, handlerFactory_1.updateOne)(ErrandModel_1.default);
exports.updateErrand = updateErrand;
const deleteErrand = (0, handlerFactory_1.deleteOne)(ErrandModel_1.default);
exports.deleteErrand = deleteErrand;
const getAllErrand = (0, handlerFactory_1.getAll)(ErrandModel_1.default);
exports.getAllErrand = getAllErrand;
const getErrand = (0, handlerFactory_1.getOne)(ErrandModel_1.default, "");
exports.getErrand = getErrand;
const getAllUserErrand = (0, handlerFactory_1.getAllByUser)(ErrandModel_1.default);
exports.getAllUserErrand = getAllUserErrand;
const createErrand = (0, catchAsync_1.default)(async (req, res, next) => {
    const { errandDetails, errandCost, deliveryAddress, categoryId, pickupAddress, } = req.body;
    if (req.file == undefined) {
        let createErrand = await ErrandModel_1.default.create({
            user: req.user._id,
            errandDetails,
            errandCost,
            deliveryAddress,
            categoryId,
            pickupAddress,
            errandImage: null,
            cloudinary_id: null,
            errandDeadline: new Date(req.body.errandDeadline),
        });
        res.status(201).json({
            status: "success",
            data: {
                data: createErrand,
            },
        });
    }
    else {
        let cloudImage = await cloudinaryImageStorage_1.default.uploader.upload(req.file.path);
        let createErrand = await ErrandModel_1.default.create({
            user: req.user._id,
            errandDetails,
            errandCost,
            deliveryAddress,
            categoryId,
            pickupAddress,
            errandDeadline: new Date(req.body.errandDeadline),
            errandImage: cloudImage.secure_url,
            cloudinary_id: cloudImage.public_id,
        });
        res.status(201).json({
            status: "success",
            data: {
                data: createErrand,
            },
        });
    }
});
exports.createErrand = createErrand;
exports.updateErrandImage = (0, catchAsync_1.default)(async (req, res, next) => {
    upload(req, res, async (err) => {
        var _a;
        if (err instanceof multer_1.default.MulterError) {
            return next((0, appError_1.default)(500, err.message, {}));
        }
        else if (err) {
            return next((0, appError_1.default)(500, err.message, {}));
        }
        const path = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        try {
            const errand = await ErrandModel_1.default.findOne({ _id: req.params.errandId });
            console.log(errand);
            if (!errand)
                return next((0, appError_1.default)(500, "Errand does not exist", {}));
            const file = await cloudinaryImageStorage_1.default.uploader.upload(path);
            await errand.updateOne({ errandImage: file.url });
            const updatedErrand = await ErrandModel_1.default.findOne({
                _id: req.params.errandId,
            });
            return res.status(201).json({
                status: "successful!",
                errand: updatedErrand,
            });
        }
        catch (error) {
            next((0, appError_1.default)(500, "An error Occured", {}));
        }
    });
});
