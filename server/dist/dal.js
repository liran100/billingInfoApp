"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transaction = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const transactionSchema = new Schema({
    customer_id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    phone: { type: String, required: true },
    total_price: { type: String, required: true },
    currency: { type: String, required: true },
    cerdit_card_type: { type: String, required: true },
    cerdit_card_number: { type: String, required: true }
});
const connection = mongoose_1.default.createConnection('mongodb://localhost:27017/localhost');
exports.transaction = connection.model('Transaction', transactionSchema);
//# sourceMappingURL=dal.js.map