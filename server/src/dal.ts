import mongoose from 'mongoose';

export interface TransactionType {
    customer_id: string;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    country: string;
    city: string;
    street: string;
    phone: string;
    total_price: string;
    currency: string;
    cerdit_card_type: string;
    cerdit_card_number: string;
}

const { Schema } = mongoose;
const transactionSchema = new Schema<TransactionType>({
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
    cerdit_card_number: { type:String, required: true }
});

const connection = mongoose.createConnection('mongodb://localhost:27017/local');
export const transaction = connection.model('Transaction', transactionSchema);