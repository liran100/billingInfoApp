import React from "react";
import { Column, Table, SortDirection, AutoSizer } from "react-virtualized";
import "react-virtualized/styles.css";
import _ from "lodash";
import { USER_DETAILS_FIELDS, CREDIT_FIELDS } from "../utility/constantFields";

const columns = [...USER_DETAILS_FIELDS, ...CREDIT_FIELDS];

interface OwnProps {
    transactions: billingSystem.TransactionType[];
}

interface OwnState {
    sortBy: string,
    sortDirection: any,
    sortedList: any
}

export class HistoryTransaction extends React.PureComponent<OwnProps, OwnState> {
    constructor(props: any) {
        super(props);
        const sortBy = "first_name";
        const sortDirection = SortDirection.ASC;
        const sortedList = this._sortList({ sortBy, sortDirection });

        this.state = {
            sortBy,
            sortDirection,
            sortedList
        };
    }

    render() {
        return (
            <div style={{ height: 400 }}>
                <AutoSizer>
                    {({ height, width }) => (
                        <Table
                            width={width}
                            height={height}
                            headerHeight={40}
                            rowHeight={30}
                            sort={this._sort}
                            sortBy={this.state.sortBy}
                            sortDirection={this.state.sortDirection}
                            rowCount={this.state.sortedList.length}
                            rowGetter={({ index }) => this.state.sortedList[index]}>
                            {columns.map(column => <Column key={column} label={column.toUpperCase()} dataKey={column} width={200} />)}
                        </Table>
                    )}
                </AutoSizer>
            </div>
        );
    }


    _sortList = ({ sortBy, sortDirection }: any) => {
        let newList = _.sortBy(this.props.transactions, [sortBy]);
        if (sortDirection === SortDirection.DESC) {
            newList.reverse();
        }
        return newList;
    };

    _sort = ({ sortBy, sortDirection }: any) => {
        const sortedList = this._sortList({ sortBy, sortDirection });
        this.setState({ sortBy, sortDirection, sortedList });
    };
}
