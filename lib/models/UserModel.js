"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: [true, "Please tell us your firstName!"],
    },
    lastName: {
        type: String,
        required: [true, "Please tell us your lastName!"],
    },
    profileImage: {
        type: String,
    },
    cloudinary_id: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        validate: [validator_1.default.isEmail, "Please provide a valid email"],
    },
    phoneNumber: {
        type: String,
        required: [true, "Please tell us your PhoneNumber!"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8,
        select: false,
    },
    isActive: {
        type: Boolean,
        select: false,
        default: false,
    },
}, { timestamps: true });
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcryptjs_1.default.compare(candidatePassword, userPassword);
};
userSchema.pre("save", async function (next) {
    // Hash the password with cost of 12
    this.password = await bcryptjs_1.default.hash(this.password, 12);
    next();
});
const User = mongoose_1.default.models.User || mongoose_1.default.model("User", userSchema);
exports.default = User;
