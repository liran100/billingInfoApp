import "./AddTransactionForm.scss";

import { useState } from "react";
import { createNewTransaction } from "../utility/fetchData";
import { USER_DETAILS_FIELDS, CREDIT_FIELDS } from "../utility/constantFields";

interface Props {
    update: () => void;
}

export function AddTransactionForm(props: Props) {
    const [newTransaction, setValue] = useState({});

    const handleSubmit = async (event: any) => {
        try {
            event.preventDefault();
            createNewTransaction(newTransaction as any);
            myFormRef.reset();
            props.update();
            
        } catch (e) {
           return alert("error to add new transaction")
        }
    };
    let myFormRef:any;
    return <form onSubmit={handleSubmit} className="new-transaction-form" ref={(el) =>{ myFormRef = el;}}>
        <div className={"user-details"}>
            <div className="title-input-group">Personal Details:</div>
            <div className="inputs-wrapper">
                {USER_DETAILS_FIELDS.map(name => <CreateInputField fieldName={name} setValue={(value: string) => setValue({ ...newTransaction, [name]: value })} />)}
            </div>
        </div>
        <div className={"credit-details"}>
            <div className="title-input-group">Credit Details:</div>
            <div className="inputs-wrapper">
                {CREDIT_FIELDS.map(name => <CreateInputField fieldName={name} setValue={(value: string) => setValue({ ...newTransaction, [name]: value })} />)}
            </div>
        </div>
        <input type="submit" value="Add Transaction" />
    </form>
}

function CreateInputField(props: { fieldName: string, setValue: (value: string) => void }) {
    return <label>
        <div className="fieldName">{props.fieldName}:</div>
        <input type="text" onChange={(event) => props.setValue(event.target.value)} />
    </label>
}
