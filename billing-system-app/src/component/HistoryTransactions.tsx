import React from "react";
import { Column, Table, SortDirection, AutoSizer } from "react-virtualized";
//import "./index.css";
import "react-virtualized/styles.css";
import _ from "lodash";

interface OwnProps {
    transactions: billingSystem.TransactionType[];
    columns: string[];
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
                            headerHeight={20}
                            rowHeight={30}
                            sort={this._sort}
                            sortBy={this.state.sortBy}
                            sortDirection={this.state.sortDirection}
                            rowCount={this.state.sortedList.length}
                            rowGetter={({ index }) => this.state.sortedList[index]}>
                            {this.props.columns.map(column => <Column label={column.toUpperCase()} dataKey={column} width={200} />)}
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
