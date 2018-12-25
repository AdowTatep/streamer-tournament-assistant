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
                        autoComplete="off"
                        value={this.state.element ? (this.state.element.name ? this.state.element.name : "") : ""}
                        onChange={(e) => { this.onChange(e) }} />
                </div>
            </div>
        );
    }

    protected validation(): { valid: boolean, errors: { name: string, error: string }[] } {
        let validation = { valid: true, errors: new Array<{ name: string, error: string }>() };

        if (this.state.element && this.state.dirty) {
            if (!this.state.element.name || this.state.element.name.length < 3) {
                validation.valid = false;
                validation.errors.push({ name: "default", error: "É preciso ter no mínimo 3 caracteres no nome" });
            }
        }

        return validation;
    }

}

export default PlayersForm;
