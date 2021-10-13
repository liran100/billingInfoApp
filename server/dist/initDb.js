"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dal_1 = require("./dal");
const fs_1 = __importDefault(require("fs"));
function initDB() {
    return __awaiter(this, void 0, void 0, function* () {
        let rawData = fs_1.default.readFileSync("src/data.json");
        let transactionsHistory = JSON.parse(rawData.toString());
        yield dal_1.transaction.insertMany(transactionsHistory);
        process.exit();
    });
}
initDB();
//# sourceMappingURL=initDb.js.map