import * as React from 'react';
import TableColumn from "./TableColumn";
import "./TableRow.scss";

export interface IProps {
    columns: TableColumn[];
}

class TableRow extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <tr className={`component-tableRow`}>
                {this.props.columns}
            </tr>
        );
    }
}

export default TableRow;

