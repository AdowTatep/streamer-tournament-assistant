import * as React from 'react';
import { IPlayer } from '../../../Entities/IPlayer';
import { ElementForm, IProps as ElementProps } from '../ElementForm';

interface IState {
    player?: IPlayer;
    dirty: boolean;
}

class PlayersForm extends ElementForm<IPlayer, IState> {

    constructor(props: ElementProps<IPlayer>) {
        super(props);
        this.state = { player: this.props.element, dirty: false };
    }

    public componentWillReceiveProps(props: ElementProps<IPlayer>) {
        if (!this.state.dirty)
            this.setState({ player: props.element });
    }

    public getFields(): React.ReactNode {
        return (
            <div className="field">
                <label className="label">Nome</label>
                <div className="control">
                    <input autoFocus
                        ref={input => input && this.props.isUpdate ? input.focus() : null}
                        className="input"
                        type="text"
                        name="name"
                        value={this.state.player ? this.state.player.name : ""}
                        onChange={(e) => { this.onChange(e) }} />
                </div>
            </div>
        );
    }

    public onChange(e: any): void {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            player: { [name]: value, },
            dirty: true
        });
    }

    protected submit(): void {
        this.props.onSubmit(this.state.player, false);
        this.setState({
            player: undefined,
            dirty: false
        });
    }
}

export default PlayersForm;
