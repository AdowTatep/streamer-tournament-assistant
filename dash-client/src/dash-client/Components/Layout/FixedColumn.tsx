import * as React from 'react';
import "./FixedColumn.scss";

interface IProps {
    column: React.ReactNode;
    body: React.ReactNode;
    attach?: "left" | "right";
}

class FixedColumn extends React.Component<IProps> {
    public render() {
        return (
            <div className={`component-fixedColumn columns`}>

                {this.props.attach || this.props.attach == "left" ? this.getColumn() : null}

                <div className="column">
                    {this.props.body}
                </div>

                {!this.props.attach || this.props.attach == "right" ? this.getColumn() : null}

            </div>
        );
    }

    private getColumn() {
        return (
            <div className="column is-one-third">
                {this.props.column}
            </div>
        );
    }
}

export default FixedColumn;
