import * as React from "react";
import "./PopUp.scss";

export interface IProps {
    value: string;
}

class Corner extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <div className={`component-popUp`}>
            </div>
        );
    }
}

export default Corner;
