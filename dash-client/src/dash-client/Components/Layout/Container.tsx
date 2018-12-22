import * as React from 'react';
import "./Container.scss";

class Container extends React.Component {
    public render() {
        return (
            <div className={`component-container`}>
                {this.props.children}
            </div>
        );
    }
}

export default Container;
