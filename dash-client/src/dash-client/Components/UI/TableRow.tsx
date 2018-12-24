import * as React from 'react';
import TableColumn from "./TableColumn";
import "./TableRow.scss";

export interface IProps {
    columns: TableColumn[];
    onClick?: (e: React.MouseEvent) => void;
    onDoubleClick?: (e: React.MouseEvent) => void;
    className?: string;
}

class TableRow extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <tr className={`component-tableRow ${this.props.className ? this.props.className : ""}`} onClick={(e) => { this.onClick(e) }} onDoubleClick={(e) => {this.onDoubleClick(e)}}>
                {this.props.columns}
            </tr>
        );
    }

    public onClick(e: React.MouseEvent): void {
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }

    public onDoubleClick(e: React.MouseEvent): void {
        if (this.props.onDoubleClick) {
            this.props.onDoubleClick(e);
        }
    }
}

export default TableRow;

