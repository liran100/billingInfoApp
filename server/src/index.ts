import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import { transaction, TransactionType } from "./dal";

const PORT = 3001;

const app = express();

// app.use(bodyParser.json());       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//     extended: true
// }));
app.use(express.json()) 
function requireAuthentication(req: any, res: any, next: any) {
    // TODO: implement authentication
    next();
}

function errorHandler(err: string, req: any, res: any, next: any) {
    res.status(500)
    res.render('error', { error: err });
}

app.use(errorHandler)
app.all('/api/*', cors(), requireAuthentication);

app.get("/api/getAllTransactions", cors(), async (req, res) => {
    const transactions = await transaction.find({});
    res.json({ transactions: transactions }).status(200);
});

app.post("/api/newTransaction", cors(), async (req, res) => {
    try {
        const body = req.body;
        await transaction.create(body);
        res.json({ message: "new transaction added" }).status(200);
    }
    catch (e) { console.log(e) }
});

app.put("/api/updateTransaction/:id", async (req, res) => {
    await transaction.findByIdAndUpdate(req.params.id, req.body);
    res.status(200);
})

app.delete('/api/delete/:id', async (req, res) => {
    await transaction.findByIdAndDelete(req.params.id);
    res.status(200);
})

app.listen(PORT, () => {
    console.log(`Server is up port ${PORT}`)
})