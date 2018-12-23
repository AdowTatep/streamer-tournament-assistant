import * as React from 'react';
import TableRow from "./TableRow";
import TableColumn from "./TableColumn";
import "./Table.scss";

export interface IProps {
    rows: TableRow[];
    header?: TableColumn[];
}

class Table extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <div className={`component-table`}>
                <table className="table is-fullwidth">
                    {this.getHeader()}
                    <tbody>
                        {this.props.rows}
                    </tbody>
                </table>
            </div>
        );
    }
    private getHeader(): React.ReactNode {
        if (this.props.header) {
            return (
                <thead>
                    <TableRow columns={this.props.header} />
                </thead>
            );
        }
    }
}

export default Table;
