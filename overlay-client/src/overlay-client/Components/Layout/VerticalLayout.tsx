import * as React from "react";
import "./VerticalLayout.scss";

export interface IProps {
    top?: React.ReactNode;
    middle?: React.ReactNode;
    bottom?: React.ReactNode;
}

class VerticalLayout extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <div className={`component-verticalLayout`}>
                <div className="top">{this.props.top}</div>
                <div className="middle">{this.props.middle}</div>
                <div className="bottom">{this.props.bottom}</div>
            </div>
        );
    }
}

export default VerticalLayout;
