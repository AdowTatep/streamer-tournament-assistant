import * as React from 'react';
import { ITournament } from '../../../Entities/ITournament';
import ElementForm from '../ElementForm';

class TournamentsForm extends ElementForm<ITournament> {

    public getFields(): React.ReactNode {
        return (
            <React.Fragment>
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
                <div className="field">
                    <label className="checkbox">
                        <input type="checkbox"
                            name="isActive"
                            value={(this.state.element ? (this.state.element.isActive ? this.state.element.isActive : false) : false as any)}
                            checked={this.state.element ? (this.state.element.isActive ? this.state.element.isActive : false) : false}
                            onChange={(e) => { this.onChange(e) }} />
                        Ativo
                    </label>
                </div>
            </React.Fragment>
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

export default TournamentsForm;
