import React, { useState } from "react";
import { createNewTransaction, getAllTransactions } from "../utility/fetchData";
import { HistoryTransaction } from "./HistoryTransactions";

export default class TransactionInfo extends React.PureComponent<{}, { result: any[] }> {
  state: any = {
    result: null
  }

  async componentDidMount() {
    const result = await getAllTransactions();
    this.setState({ result });
  }

  render() {
    return (
      <>
        <AddTransactionForm />
        <HistoryTransaction transactions={this.state.result} columns={[...USER_DETAILS_FIELDS, ...CREDIT_FIELDS]} />
      </>
    );
  }
}

const USER_DETAILS_FIELDS: string[] = ["customer_id", "first_name", "last_name", "email", "gender", "country", "street", "city", "phone"];
const CREDIT_FIELDS: string[] = ["total_price", "currency", "cerdit_card_type", "cerdit_card_number"]

function AddTransactionForm() {
  const [newTransaction, setValue] = useState({});

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      console.log(newTransaction);
      createNewTransaction(newTransaction as any)
    } catch (e) {
      console.log("error occurd add new transaction.")
    }
  };

  return <form onSubmit={handleSubmit}>
    <div className={"user-details"}>
      {USER_DETAILS_FIELDS.map(name => <CreateInputField fieldName={name} setValue={(value: string) => setValue({ ...newTransaction, [name]: value })} />)}
    </div>
    <div className={"user-details"}>
      {CREDIT_FIELDS.map(name => <CreateInputField fieldName={name} setValue={(value: string) => setValue({ ...newTransaction, [name]: value })} />)}
    </div>
    <input type="submit" value="Add Transaction" />
  </form>
}

function CreateInputField(props: { fieldName: string, setValue: (value: string) => void }) {
  return <label>
    {props.fieldName}:
    <input type="text" onChange={(event) => props.setValue(event.target.value)} />
  </label>
}
