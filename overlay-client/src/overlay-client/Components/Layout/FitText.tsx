import * as React from "react";
import "./FitText.scss";
import { EventEmitter } from "events";
declare let textFit: any;

export interface IProps {
    minSize?: number;
    maxSize?: number;
    multiLine?: boolean;
    shouldRefit?: EventEmitter;
    onFit?: (e) => void;
}

//  Refer to https://youtu.be/JWt-dT3xZys?list=PLTEhlYdONYxv1wk2FsIpEz92X3x2E7bSx&t=257
class FitText extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    public componentDidMount() {
        if (this.props.shouldRefit) {
            this.props.shouldRefit.on("refit", (ev) => { this.refit() });
        }

        this.refit();
    }

    public render() {
        return (
            <div className={`component-fitText`}>
                <span className="textFitted">{this.props.children}</span>
            </div>
        );
    }

    public refit() {
        textFit(document.querySelectorAll('.component-fitText'),
            {
                minFontSize: this.props.minSize,
                maxFontSize: this.props.maxSize,
                multiLine: false,
                detectMultiLine: false,
                alignVert: true,
                alignVertWithFlexbox: true,
            });
        if (this.props.onFit) {
            this.props.onFit(null);
        }
    }
}

export default FitText;
