import "./TransactionInfo.scss";

import React from "react";
import { getAllTransactions } from "../utility/fetchData";
import { HistoryTransaction } from "./HistoryTransactions";
import { AddTransactionForm } from "./AddTransactionForm";

export default class TransactionInfo extends React.PureComponent<{}, { result: any[] }> {
  state: any = {
    result: null
  }

  async componentDidMount() {
    await this.updateTable()
  }

  render() {
    return (
      <>
        <div className="title">Billing System</div>
        <AddTransactionForm update={this.updateTable} />
        {this.state.result && <HistoryTransaction transactions={this.state.result} />}
      </>
    );
  }

  updateTable = async () => {
    const result = await getAllTransactions();
    this.setState({ result });
  }
}
