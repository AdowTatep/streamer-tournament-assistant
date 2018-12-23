import * as React from 'react';
import "./InGameOverlay.scss";
import TeamScore from '../Elements/League/TeamScore';
import Corner from '../Elements/League/Corner';
import VerticalLayout from '../Layout/VerticalLayout';
import Counter from '../UI/Counter';
import Transition from '../Layout/Transition';

class InGameOverlay extends React.Component {
    public render() {
        return (
            <div className="component-inGameOverlay">
                <VerticalLayout top={this.getLayoutTop()} middle={this.getLayoutMiddle()} bottom={this.getLayoutBottom()} />
            </div>
        );
    }

    public getLayoutTop() {
        return (
            <div className="container-top">
                <div className={`scoreWrapper losing`}>
                    <TeamScore teamName="Time" teamNumber={1} />
                </div>
                {/* TODO: Add losing team logic */}
                <div className={`scoreWrapper`}>
                    <TeamScore teamName="Time" teamNumber={2} />
                </div>
            </div>
        );
    }

    public getLayoutMiddle() {
        return (
            <div></div>
        );
    }

    public getLayoutBottom() {
        return (
            <div>
                <Corner>
                    <Transition transition={1} duration={4} startDelay={3}>
                        <Counter />
                    </Transition>
                </Corner>
            </div>
        );
    }
}

export default InGameOverlay;
