"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileImage = exports.updateProfile = exports.getProfile = exports.getUserProfile = exports.getAllUser = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const handlerFactory_1 = require("./handlerFactory");
const cloudinaryImageStorage_1 = __importDefault(require("../utils/cloudinaryImageStorage"));
const multerImageUpload_1 = __importDefault(require("../utils/multerImageUpload"));
const multer_1 = __importDefault(require("multer"));
const upload = multerImageUpload_1.default.single("profileImage");
exports.getAllUser = (0, handlerFactory_1.getAll)(UserModel_1.default);
exports.getUserProfile = (0, catchAsync_1.default)(async (req, res, next) => {
    const user = await UserModel_1.default.findOne({ _id: req.params.userId });
    return res.status(200).json({
        user,
    });
});
exports.getProfile = (0, catchAsync_1.default)(async (req, res, next) => {
    const user = await UserModel_1.default.findOne({ _id: req.user._id });
    console.log();
    if (!user)
        return next((0, appError_1.default)(404, "User does not exist", {}));
    return res.status(200).json({
        user,
    });
});
exports.updateProfile = (0, catchAsync_1.default)(async (req, res, next) => {
    const profile = await UserModel_1.default.findOne({ _id: req.user._id });
    if (!profile)
        return next((0, appError_1.default)(404, "profile does not exist", {}));
    await profile.updateOne({
        firstName: req.body.firstName || profile.firstName,
        lastName: req.body.lastName || profile.lastName,
        email: req.body.email || profile.email,
        phoneNumber: req.body.phoneNumber || profile.phoneNumber,
    });
    const updateProfile = await UserModel_1.default.findOne({ _id: req.user._id });
    return res.status(201).json({
        status: "successful!",
        profile: updateProfile,
    });
});
exports.updateProfileImage = (0, catchAsync_1.default)(async (req, res, next) => {
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
            const profile = await UserModel_1.default.findOne({ email: req.user.email });
            if (!profile)
                return next((0, appError_1.default)(500, "Profile does not exist", {}));
            const file = await cloudinaryImageStorage_1.default.uploader.upload(path);
            await profile.updateOne({ profileImage: file.url });
            const updateProfile = await UserModel_1.default.findOne({ _id: req.user._id });
            return res.status(201).json({
                status: "successful!",
                profile: updateProfile,
            });
        }
        catch (error) {
            next((0, appError_1.default)(500, "An error Occured", {}));
        }
    });
});
