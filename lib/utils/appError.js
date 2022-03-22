"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandler = (status, message, data) => {
    return { status, message, data, success: false };
};
exports.default = ErrorHandler;
