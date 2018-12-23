import * as React from 'react';
import "./Card.scss";

export interface IProps {
    className?: string;
    light?: boolean;
}

class Card extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <div className={`component-Card box ${(this.props.light ? "light" : "")} ${this.props.className ? this.props.className : ""}`}>
                {this.props.children}
            </div>
        );
    }
}

export default Card;
