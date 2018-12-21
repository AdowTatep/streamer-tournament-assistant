import * as React from "react";
import "./Counter.scss";
import * as odmtr from "odometer";
import "odometer/themes/odometer-theme-minimal.css";
import FitText from "../Layout/FitText";
import { EventEmitter } from "events";

export interface IProps {
    initialValue?: number;
    prefix?: string;
    suffix?: string;
}

interface IState {
    currentValue: number;
}

class Corner extends React.Component<IProps, IState> {
    odometer: any;
    debounceId: NodeJS.Timeout[] = [];

    shoudFit = new EventEmitter();

    constructor(props: IProps) {
        super(props);
        this.state = { currentValue: props.initialValue || 0.0 };
    }

    public componentDidMount() {
        this.startOdometer(0);
        this.animationDone(null, 10);
        setInterval(() => {
            this.setState({ currentValue: this.state.currentValue + Math.floor((Math.random() + 1) * 99) })
        }, 5000);
    }

    public render() {
        return (
            <div className={`component-counter`}>
                <div className="margin">
                    <div className="fit-counter">
                        <FitText minSize={15} maxSize={65} shouldRefit={this.shoudFit} onFit={() => { this.startOdometer() }}>
                            <div>R$</div><div className="value">{this.state.currentValue}</div>
                        </FitText>
                    </div>
                </div>
            </div>
        );
    }

    private startOdometer(debounceMs: number = 200) {
        var initOdometer = () => {
            var element = document.querySelector(".component-counter");
            if (element) {
                var value = element.querySelector(".value");
                if (value) {
                    this.odometer = new odmtr({
                        el: value,
                        value: this.state.currentValue,
                        format: '(.ddd),dd',
                        theme: 'minimal',
                        selector: '.value',
                        duration: 5000,
                    });

                    value.removeEventListener("odometerdone", () => { });
                    value.addEventListener("odometerdone", (e) => this.animationDone(e));
                }
            }
        }

        clearTimeout(this.debounceId[0]);
        this.debounceId[0] = setTimeout(() => { initOdometer() }, debounceMs);
    }

    private animationDone(event, debounceMs: number = 200) {
        // If odometer animation finishes, do something
        var refit = () => this.shoudFit.emit("refit");

        clearTimeout(this.debounceId[1]);
        this.debounceId[1] = setTimeout(() => { refit() }, debounceMs);
    }
}

export default Corner;
