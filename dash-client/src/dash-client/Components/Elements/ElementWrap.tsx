import * as React from 'react';
import { EntityStore } from '../../Stores/EntityStore';
import ElementCrud from './ElementCrud';

interface TElement {
    _id: string;
}

interface IProps {
    namespace: string;
}

interface IState<T> {
    elements: T[];
    selectedElement: number;
}

export default abstract class ElementWrap<T extends TElement> extends React.Component<IProps, IState<T>> {
    store: EntityStore<T>;

    constructor(props: IProps) {
        super(props);
        this.store = new EntityStore(this.props.namespace);
        this.state = { elements: new Array<T>(), selectedElement: -1 }
    }

    public componentDidMount() {
        this.store.on("playerListUpdate", (event) => { this.updateElementList(event); })
        this.store
            .retrievePlayers()
            .then(players => {
                this.updateElementList(players);
            })
            .catch(console.error);
    }

    public render() {
        type ElCrud = new () => ElementCrud<T, IState<T>>;
        const ElCrud = ElementCrud as ElCrud;
        return (
            <div className={`component-players`}>
                <ElCrud
                    elements={this.state.elements}
                    selectedElement={this.state.selectedElement}
                    createElement={(element) => { this.onElementCreate(element) }}
                    updateElement={(element, i) => { this.onElementUpdate(element, i) }}
                    deleteElement={(element, i) => { this.onElementDelete(element, i) }}
                    elementTable={this.getElementTable()}
                    elementForm={this.getElementForm()}
                />
            </div>
        );
    }

    protected abstract getElementTable(): React.ReactNode;

    protected abstract getElementForm(): any;

    private onElementCreate(element: T): void {
        //Keep old elements
        let oldElements = [...this.state.elements];
        let newElements = [...this.state.elements];

        // Push the new element and update the state
        newElements.push(element);
        this.updateElementList(newElements);

        // Try to really create the element
        this.store
            .createPlayer(element)
            .then(player => {
                // If the element was created, update the list again, but with the real data
                oldElements.push(player);
                this.updateElementList(oldElements);
            })
            .catch(err => {
                // If some error occurred, rollback
                this.updateElementList(oldElements);
                console.error(err);
            });

    }

    private onElementUpdate(element: T, i: number): void {
        //Keep old elements
        let oldElements = [...this.state.elements];
        let newElements = [...this.state.elements];

        // Update the element values and update the state
        newElements[i] = element;
        this.updateElementList(newElements);

        this.store.updatePlayer(element)
            .then(player => {
                if (player) {
                    // If succeeded, update the list again, but with the real data
                    var index = oldElements.findIndex(x => x._id == player._id);
                    oldElements[index] = player;
                }

                this.updateElementList(oldElements);
            })
            .catch(err => {
                // If some error occurred, rollback
                this.updateElementList(oldElements);
                console.error(err);
            });
    }

    private onElementDelete(player: T, i: number): void {
        //Keep old elements
        let oldElements = [...this.state.elements];
        let newElements = [...this.state.elements];

        // Get every that isn't the deleted
        newElements = newElements.filter((x, ind) => ind !== i)
        this.updateElementList(newElements);

        // Refresh list
        this.store.deletePlayer(this.state.elements[i])
            .then(element => {
                if (element) {
                    var index = oldElements.findIndex(x => x._id == element._id);
                    oldElements.splice(index, 1);
                }

                this.updateElementList(oldElements);
            })
            .catch(err => {
                // If some error occurred, rollback
                this.updateElementList(oldElements);
                console.error(err);
            });
    }

    protected onElementSelected(player: T, i: number): void {
        if (this.state.selectedElement === i) {
            this.setState({ selectedElement: -1 });
        } else {
            this.setState({ selectedElement: i });
        }
    }

    private updateElementList(elements: T[]): void {
        this.setState({ elements });
    }
}
