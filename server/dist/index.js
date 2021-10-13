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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dal_1 = require("./dal");
const PORT = 3001;
const app = (0, express_1.default)();
app.use(express_1.default.json());
function requireAuthentication(req, res, next) {
    next();
}
function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
}
app.use(errorHandler);
app.all('/api/*', (0, cors_1.default)(), requireAuthentication);
app.get("/api/getAllTransactions", (0, cors_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield dal_1.transaction.find({});
    res.json({ transactions: transactions }).status(200);
}));
app.post("/api/newTransaction", (0, cors_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        console.log(body);
        yield dal_1.transaction.create(body);
        res.json({ message: "new transaction added" }).status(200);
    }
    catch (e) {
        console.log(e);
    }
}));
app.put("/api/updateTransaction/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield dal_1.transaction.findByIdAndUpdate(req.params.id, req.body);
    res.status(200);
}));
app.delete('/api/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield dal_1.transaction.findByIdAndDelete(req.params.id);
    res.status(200);
}));
app.listen(PORT, () => {
    console.log(`Server is up port ${PORT}`);
});
//# sourceMappingURL=index.js.map