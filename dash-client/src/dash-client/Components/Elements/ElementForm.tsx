import * as React from 'react';
import SideForm from '../UI/SideForm';

export interface IProps<T> {
    element?: T;
    onSubmit: (element?: T, isCancel?: boolean) => void;
    isUpdate: boolean;
}

interface IState<T> {
    element?: T;
    dirty: boolean;
}

export default abstract class ElementForm<T> extends React.Component<IProps<T>, IState<T>> {

    constructor(props: IProps<T>) {
        super(props);
        this.state = { element: this.props.element, dirty: false };
    }

    public componentWillReceiveProps(props: IProps<T>) {
        if (!this.state.dirty)
            this.setState({ element: props.element });
    }

    public render() {
        return (
            <div className={`component-elementsForm`}>
                <SideForm onCancel={() => { this.cancelUpdate() }} onSubmit={() => { this.submit() }} isUpdate={this.props.isUpdate}>
                    {this.getFields()}
                </SideForm>
            </div>
        );
    }
    protected abstract getFields(): React.ReactNode;

    public onChange(e: any): void {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        const val: any = { [name]: value };

        this.setState({
            element: val,
            dirty: true
        });
    }

    protected submit(): void {
        this.props.onSubmit(this.state.element, false);
        this.setState({
            element: undefined,
            dirty: false
        });
    }

    public cancelUpdate(): void {
        this.props.onSubmit(undefined, true);
    }
}
