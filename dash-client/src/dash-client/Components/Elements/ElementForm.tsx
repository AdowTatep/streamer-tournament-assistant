import * as React from 'react';
import SideForm from '../UI/SideForm';

export interface IProps<T> {
    element?: T;
    onSubmit: (element?: T, isCancel?: boolean) => void;
    isUpdate: boolean;
}

export abstract class ElementForm<T, TState> extends React.Component<IProps<T>, TState> {
    constructor(props: IProps<T>) {
        super(props);
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

    protected abstract submit(): void;

    public cancelUpdate(): void {
        this.props.onSubmit(undefined, true);
    }
}
