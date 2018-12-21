import * as React from "react";
import CornerBackground from "./../../../Images/corner.png";
import "./Corner.scss";
class Corner extends React.Component {
    public render() {
        return (
            <div className={`component-corner`}>
                <img className="corner-background" src={CornerBackground} />
                <div className="corner-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Corner;
