import * as React from "react";
import "./Transition.scss";
import { TimelineMax } from "gsap";

export interface IProps {
    duration: number;
    transition: number;
    delayBetween?: number;
    startDelay?: number;
}

class Transition extends React.Component<IProps> {
    mainTimeline!: TimelineMax;

    constructor(props: IProps) {
        super(props);
    }

    public componentDidMount() {
        const transition = document.querySelector('.component-transition');
        if (transition) {
            this.mainTimeline = new TimelineMax({ repeat: -1, repeatDelay: this.props.delayBetween || this.props.transition || 0, delay: this.props.startDelay || 0 });
            transition.childNodes
                .forEach((element, i) => {
                    this.setupChildAnimation(element, i);
                });
        }
    }

    public render() {
        return (
            <div className={`component-transition`}>
                {this.props.children}
            </div>
        );
    }

    private setupChildAnimation(element: ChildNode, i: number) {
        console.dir(element);
        this.mainTimeline
            .from(element, this.props.transition, { display: 'none', opacity: 0 })
            .to(element, this.props.transition, { display: 'none', opacity: 0 }, `+=${this.props.duration}`);
    }
}

export default Transition;
