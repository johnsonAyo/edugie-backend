"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const appError_1 = __importDefault(require("./utils/appError"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
const mealRoutes_1 = __importDefault(require("./routes/mealRoutes"));
// import { connectTestDB } from "./db/db";
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
// Start express app
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// Set security HTTP headers
app.use((0, helmet_1.default)());
// Development logging
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
// Body parser, reading data from body into req.body
app.use(express_1.default.json({ limit: "10kb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10kb" }));
app.use((0, cookie_parser_1.default)());
// Data sanitization against NoSQL query injection
app.use((0, express_mongo_sanitize_1.default)());
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
mongoose_1.default
    .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then(() => console.log(`DB connection successful!`));
// 3) ROUTES
app.use("/api/meal", mealRoutes_1.default);
app.all("*", (req, res, next) => {
    next((0, appError_1.default)(404, `Can't find ${req.originalUrl} on this server, login via a Post Request to /users/login. Visit postman documentation for more information`, {}));
});
app.use(errorController_1.default);
exports.default = app;
