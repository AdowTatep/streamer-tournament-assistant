import * as React from 'react';
import "./Card.scss";

export interface IProps {

}

class Card extends React.Component {

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <div className={`component-Card tile is-child notification is-primary`}>
                {this.props.children}
            </div>
        );
    }
}

export default Card;
