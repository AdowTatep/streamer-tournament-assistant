import * as React from 'react';
import "./ElementForm.scss";
import SideForm from '../UI/SideForm';
import { EntityStore } from '../../Stores/EntityStore';

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
        this.state = { element: this.props.element ? this.props.element : ({} as T), dirty: false };
    }

    public componentWillReceiveProps(props: IProps<T>) {
        if (props.element) {
            this.setState({ element: props.element });
        }
    }

    public render() {
        return (
            <div className={`component-elementsForm`}>
                <SideForm
                    onCancel={() => { this.cancelUpdate() }}
                    onSubmit={() => { this.submit() }}
                    isUpdate={this.props.isUpdate}
                    validation={this.validation()}>
                    {this.getFields()}
                </SideForm>
            </div>
        );
    }
    protected abstract getFields(): React.ReactNode;

    protected abstract validation(): { valid: boolean, errors: { name: string, error: string }[] };

    public onChange(e: any): void {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        let val: any = null;

        if (target.type == "number" || target.type == "tel")
            val = { ...this.state.element, [name]: parseInt(value.toString().trim()) };
        else
            val = { ...this.state.element, [name]: value };

        this.setState({
            element: val,
            dirty: true
        });
    }

    protected submit(): void {
        if (this.state.dirty && this.validation().valid) {
            this.props.onSubmit(this.state.element, false);
            this.clearState();
        } else {
            console.log("Tried to submit a non dirty form")
        }
    }

    public cancelUpdate(): void {
        this.props.onSubmit(undefined, true);
        this.clearState();
    }

    protected clearState() {
        this.setState({
            element: ({} as T),
            dirty: false
        });
    }


}
