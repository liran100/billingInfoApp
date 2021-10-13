import { transaction, TransactionType } from "./dal";
import fs from "fs";

async function initDB() {
    let rawData: Buffer = fs.readFileSync("src/data.json");
    let transactionsHistory = JSON.parse(rawData.toString()) as TransactionType[];
    await transaction.insertMany(transactionsHistory);
    process.exit();
}

initDB();