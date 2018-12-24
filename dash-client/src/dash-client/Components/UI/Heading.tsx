import * as React from 'react';
import "./Heading.scss";

class Heading extends React.Component {
    public render() {
        return (
            <div className={`component-heading title is-1`}>
                {this.props.children}
            </div>
        );
    }
}

export default Heading;
