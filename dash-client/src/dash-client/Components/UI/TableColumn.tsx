import * as React from 'react';
import "./TableColumn.scss";

export interface IProps {
    header?: boolean;
}

class TableColumn extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        if (this.props.header) {
            return (
                <th className={`component-tableColumn title is-4`}>
                    {this.props.children}
                </th>
            );
        } else {
            return (
                <td className={`component-tableColumn`}>
                    {this.props.children}
                </td>
            );
        }
    }
}

export default TableColumn;
