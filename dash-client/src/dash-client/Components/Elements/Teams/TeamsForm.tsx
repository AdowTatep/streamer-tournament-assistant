import * as React from 'react';
import ElementForm from '../ElementForm';
import { ITeam } from '../../../Entities/ITeam';

class TeamsForm extends ElementForm<ITeam> {

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
                        value={this.state.element ? this.state.element.name : ""}
                        onChange={(e) => { this.onChange(e) }} />
                </div>
            </div>
        );
    }
}

export default TeamsForm;
