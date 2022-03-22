"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.logout = exports.login = exports.signup = void 0;
const { promisify } = require("util");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const cloudinaryImageStorage_1 = __importDefault(require("./../utils/cloudinaryImageStorage"));
const signToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);
    res.cookie("jwt", token, {
        expires: new Date(Date.now() +
            process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });
    // Remove password from output
    user.password = undefined;
    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
};
exports.signup = (0, catchAsync_1.default)(async (req, res, next) => {
    const { email, phoneNumber } = req.body;
    const userMail = await UserModel_1.default.findOne({ email });
    const userPhone = await UserModel_1.default.findOne({ phoneNumber });
    if (userMail || userPhone)
        return next((0, appError_1.default)(404, "User email or Phone number Already exist", {}));
    if (req.file == undefined) {
        const newUser = await UserModel_1.default.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            password: req.body.password,
            profileImage: null,
            cloudinary_id: null,
        });
        createSendToken(newUser, 201, req, res);
    }
    else {
        let cloudImage = await cloudinaryImageStorage_1.default.uploader.upload(req.file.path);
        const newUser = await UserModel_1.default.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            password: req.body.password,
            profileImage: cloudImage.secure_url,
            cloudinary_id: cloudImage.public_id,
        });
        createSendToken(newUser, 201, req, res);
    }
});
exports.login = (0, catchAsync_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    // 1) Check if email and password exist
    if (!email || !password) {
        return next((0, appError_1.default)(400, "Please provide email and password!", {}));
    }
    // 2) Check if user exists && password is correct
    const user = await UserModel_1.default.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next((0, appError_1.default)(401, "Incorrect email or password", {}));
    }
    req.user = user;
    // 3) If everything ok, send token to client
    createSendToken(user, 200, req, res);
});
const logout = (req, res) => {
    res.cookie("jwt", "loggedout", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ status: "success" });
};
exports.logout = logout;
exports.protect = (0, catchAsync_1.default)(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        return next((0, appError_1.default)(401, "You are not logged in! Please log in to get access.", {}));
    }
    // 2) Verification token
    const decoded = await promisify(jsonwebtoken_1.default.verify)(token, process.env.JWT_SECRET);
    // 3) Check if user still exists
    const currentUser = await UserModel_1.default.findById(decoded.id);
    if (!currentUser) {
        return next((0, appError_1.default)(401, "The user belonging to this token does no longer exist.", {}));
    }
    req.user = currentUser;
    next();
});
