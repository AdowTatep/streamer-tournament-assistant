import * as React from 'react';
import "./ElementCrud.scss";
import FixedColumn from '../Layout/FixedColumn';
import Card from '../UI/Card';
import DeleteConfirmation from '../UI/DeleteConfirmation';
import ElementForm from './ElementForm';
import { EntityStore } from '../../Stores/EntityStore';

interface IProps<T> {
    elements: T[];
    elementTable: React.ReactNode;
    elementForm: ElementForm<T>;
    selectedElement: number;
    createElement: (element: T, ) => void;
    deleteElement: (element: T, i: number) => void;
    updateElement: (element: T, i: number) => void;
    store: EntityStore<T>;
}

interface IState<T> {
    elementToUpdate: number;
    elementToDelete: number;
}

export default class ElementCrud<T, S> extends React.Component<IProps<T>, IState<T>> {

    constructor(props: IProps<T>) {
        super(props);
        this.state = { elementToDelete: -1, elementToUpdate: -1 };
    }


    public render() {
        return (
            <div className={`component-elementCrud`}>
                <FixedColumn
                    body={(
                        <Card>
                            {this.props.elementTable}
                        </Card>
                    )}

                    column={(
                        <div>
                            <div className="level">
                                <div className="level-left">
                                    <button className="button" disabled={this.disableCondition()} onClick={() => { this.setElementToUpdate() }}>Editar</button>
                                </div>
                                <div className="level-right">
                                    <button className="button is-danger" disabled={this.disableCondition()} onClick={() => { this.setElementToDelete() }}>Apagar</button>
                                </div>
                            </div>
                            {this.getDeleteOrForm()}
                        </div>
                    )}
                />
            </div>
        );
    }

    private disableCondition(): boolean {
        return this.props.selectedElement === -1 || (!this.props.elements) || (this.props.elements && this.props.elements.length <= 0)
    }

    private getDeleteOrForm(): React.ReactNode {
        if (this.state.elementToDelete !== -1) {
            return (
                <DeleteConfirmation onCancel={() => { this.setState({ elementToDelete: -1 }) }} onConfirm={() => { this.onElementDelete(); }} />
            );
        } else {
            type ElForm = new () => ElementForm<T>;
            const ElForm = this.props.elementForm as unknown as ElForm;
            return (
                <div>
                    <ElForm isUpdate={this.state.elementToUpdate !== -1} element={this.props.elements[this.state.elementToUpdate]} onSubmit={(element, isCancel) => { this.onElementSubmit(element, isCancel); }} />
                </div>
            );
        }
    }

    private setElementToDelete(): void {
        if (this.props.elements[this.props.selectedElement]) {
            this.setState({ elementToDelete: this.props.selectedElement });
        }
    }

    private setElementToUpdate(): void {
        if (this.props.elements[this.props.selectedElement]) {
            this.setState({ elementToUpdate: this.props.selectedElement });
        }
    }

    private onElementDelete(): void {
        // If the clicked element exists
        if (this.props.elements[this.state.elementToDelete]) {
            // Call the delete
            this.props.deleteElement(this.props.elements[this.state.elementToDelete], this.state.elementToDelete);
            // Reset the delete state
            this.setState({ elementToDelete: -1, elementToUpdate: -1 });
        }
    }

    private onElementSubmit(element?: T, isCancel?: boolean): void {
        // If an element is filled we clicked on confirm
        if (element) {
            // After confirm, check if the action is an update or a new
            if (this.state.elementToUpdate !== -1) {
                //Handle update
                this.props.updateElement(element, this.state.elementToUpdate);
                this.setState({ elementToUpdate: -1 });
            } else {
                //Handle create                
                this.props.createElement(element);
            }

        } else {
            // If we clicked on cancel, reset update doing nothing
            this.setState({ elementToUpdate: -1 });
        }
    }
}
