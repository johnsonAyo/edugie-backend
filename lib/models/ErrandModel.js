"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const errandSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.SchemaTypes.ObjectId, ref: "User" },
    categoryId: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "User",
        required: [true, "Errand Category is required"],
    },
    errandImage: {
        type: String,
    },
    cloudinary_id: {
        type: String,
    },
    // categories: {
    //   type: String,
    //   required: [true, "An errand  must have a category"],
    //   enum: {
    //     values: [
    //       "pickup and delivery",
    //       "shopping",
    //       "transport",
    //       "food purchase",
    //       "gardening",
    //       "baby sitting",
    //       "laundry",
    //       "cleaning",
    //       "reading/writing",
    //       "moving services",
    //       "artisan service",
    //       "ticket-purchase",
    //       "chaffeur",
    //       "auto-service",
    //       "fashion & tailoring",
    //       "tour-guides",
    //     ],
    //     message:
    //       "errand categories is either: pickup and delivery, shopping, transport, food purchase, gardening, baby sitting, laundry, cleaning, reading/writing, moving services, artisan service, ticket-purchase, chaffeur, auto-service, fashion & tailoring, tour-guides, cathering service, real-estate, electronic-repair, investigative services, tutoring, others",
    //   },
    // },
    errandDetails: {
        type: String,
        required: [true, "Give more information about the errands"],
        default: '',
    },
    errandCost: {
        type: String,
        required: [true, "How much are you willing to pay for the errands"],
    },
    errandDeadline: {
        type: Date,
        required: [true, "Deadline for this errands"],
    },
    status: {
        type: String,
        default: "pending",
    },
    acceptedAt: {
        type: Date,
    },
    completedAt: {
        type: Date,
    },
    isInsurance: {
        type: Boolean,
        default: false,
    },
    sendGofer: {
        type: Boolean,
        default: false,
    },
    pickupAddress: {
        type: String,
        required: [true, "An errand  must have a pickup address"],
    },
    deliveryAddress: {
        type: String,
        required: [true, "An errand  must have a delivery address"],
    },
}, { timestamps: true });
const Errand = mongoose_1.default.model("Errand", errandSchema);
exports.default = Errand;
