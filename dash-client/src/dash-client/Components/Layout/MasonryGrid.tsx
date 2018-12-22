import * as React from 'react';
import Masonry from 'masonry-layout';
import "./MasonryGrid.scss";

export interface IProps {

}

class MasonryGrid extends React.Component {

    constructor(props: IProps) {
        super(props);
    }

    public componentDidMount() {
        // var msnry = new Masonry('.component-MasonryGrid', {
        //     itemSelector: '.column',
        //     columnWidth: '.sizer',
        //     percentPosition: true,
        // });
    }

    public render() {
        return (
            <div className={`component-MasonryGrid columns is-multiline`}>
                {this.getChildrenWithClasses()}
            </div>
        );
    }

    private getChildrenWithClasses(): React.ReactNode {
        return React.Children.map(this.props.children, (child: any) => {
            return (
                <div className="column">
                    {child}
                </div>
            );
        });
    }
}

export default MasonryGrid;
