import * as React from 'react';
import TableRow from './TableRow';
import Table from './Table';
import TableColumn from './TableColumn';

interface IProps<T> {
    rows: T[];
    getColumns: (element: T) => TableColumn[];
    getHeaders: () => TableColumn[];
    onSelected: (element: T, i: number) => void;
    onDoubleClick?: (element: T, i: number) => void;
}

interface IState {
    selectedIndex: number;
}

class SelectableTable<T> extends React.Component<IProps<T>, IState> {
    constructor(props: IProps<T>) {
        super(props);
        this.state = { selectedIndex: -1 };
    }

    public render() {
        return (
            <div className={`component-selectableTable`}>
                <Table rows={this.getTableRows(this.props.rows)} header={this.props.getHeaders()} />
            </div>
        );
    }
    public getTableRows(rows: T[]): TableRow[] {
        return rows.map((row, i) =>
            (
                <TableRow
                    key={i}
                    className={this.state.selectedIndex === i ? "is-selected" : ""}
                    columns={this.props.getColumns(row)}
                    onClick={(e) => { this.onSelected(row, i) }}
                    onDoubleClick={(e) => { this.onDoubleClick(row, i) }} ></TableRow>
            ) as unknown as TableRow
        );
    }

    public onSelected(element: T, i: number): void {
        this.props.onSelected(element, i);

        if (this.state.selectedIndex === i) {
            this.setState({ selectedIndex: -1 });
        } else {
            this.setState({ selectedIndex: i });
        }
    }

    public onDoubleClick(element: T, i: number): void {
        if (this.props.onDoubleClick)
            this.props.onDoubleClick(element, i);
    }
}

export default SelectableTable;
