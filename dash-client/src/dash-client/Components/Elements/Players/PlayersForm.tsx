import * as React from 'react';
import { IPlayer } from '../../../Entities/IPlayer';
import ElementForm from '../ElementForm';

class PlayersForm extends ElementForm<IPlayer> {

    public getFields(): React.ReactNode {
        return (
            <div className="field">
                <label className="label">Nome</label>
                <div className="control">
                    <input autoFocus
                        className="input"
                        type="text"
                        name="name"
                        value={this.state.element ? (this.state.element.name ? this.state.element.name : "") : ""}
                        onChange={(e) => { this.onChange(e) }} />
                </div>
            </div>
        );
    }
}

export default PlayersForm;
