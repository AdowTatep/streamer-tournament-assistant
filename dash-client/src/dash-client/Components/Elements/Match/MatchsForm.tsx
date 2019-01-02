import * as React from 'react';
import ElementForm from '../ElementForm';
import { IMatch, IMatchTeamInfo } from '../../../Entities/IMatch';
import { ITeam } from '../../../Entities/ITeam';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { EntityStore } from '../../../Stores/EntityStore';

class MatchsForm extends ElementForm<IMatch> {

    teamsStore: EntityStore<ITeam> = new EntityStore<ITeam>("team");
    teamList: ITeam[] = [];

    public componentDidMount() {
        this.teamsStore
            .retrieveEntities()
            .then(teams => this.teamList = teams);
    }

    public getFields(): React.ReactNode {
        return (
            <React.Fragment>
                {this.getIndexBestOf()}
                {this.getType()}
                {this.getTeamsField()}
            </React.Fragment>
        );
    }

    protected validation(): { valid: boolean, errors: { name: string, error: string }[] } {
        let validation = { valid: true, errors: new Array<{ name: string, error: string }>() };

        if (this.state.element && this.state.dirty) {
            if (!this.state.element.index || isNaN(parseInt((this.state.element.index as any)))) {
                validation.valid = false;
                validation.errors.push({ name: "default", error: "Posição deve ser um número" });
            }

            if (!this.state.element.bestOf || isNaN(parseInt((this.state.element.bestOf as any)))) {
                validation.valid = false;
                validation.errors.push({ name: "default", error: "\"Melhor de\" deve ser um número" });
            }

            if (!this.state.element.teamInfo || this.state.element.teamInfo.length < 2) {
                validation.valid = false;
                validation.errors.push({ name: "default", error: "É preciso ter no mínimo 2 times" });
            } else if (this.state.element.teamInfo && this.state.element.teamInfo.some(x => !x.teamName || x.teamName.length < 3)) {
                validation.valid = false;
                validation.errors.push({ name: "default", error: "Um time precisa ter no mínimo 3 caracteres no nome" });
            } else if (this.state.element.teamInfo && this.state.element.teamInfo.some(x => !x.index || x.index < 1)) {
                validation.valid = false;
                validation.errors.push({ name: "default", error: "A posição do time precisa ser maior que 1" });
            } else if (!this.teamList || this.state.element.teamInfo && !this.state.element.teamInfo.every(x => this.teamList.some(y => y.name === x.teamName))) {
                validation.valid = false;
                validation.errors.push({ name: "default", error: "O time fornecido precisa existir na lista de times" });
            }

            if (!this.state.element.type) {
                validation.valid = false;
                validation.errors.push({ name: "default", error: "É preciso escolher um tipo" });
            }
        }

        return validation;
    }

    private getIndexBestOf() {
        return (
            <div className="groupFields">
                <div className="field">
                    <label className="label">Posição</label>
                    <div className="control">
                        <input autoFocus
                            className="input"
                            type="number"
                            name="index"
                            autoComplete="off"
                            min="1"
                            value={this.state.element ? (this.state.element.index !== undefined ? this.state.element.index : "") : ""}
                            onChange={(e) => { this.onChange(e) }} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Melhor de</label>
                    <div className="control">
                        <input
                            className="input"
                            type="number"
                            name="bestOf"
                            autoComplete="off"
                            min="1"
                            value={this.state.element ? (this.state.element.bestOf !== undefined ? this.state.element.bestOf : "") : ""}
                            onChange={(e) => { this.onChange(e) }} />
                    </div>
                </div>
            </div>
        );
    }

    private getType() {
        return (
            <div className="field">
                <label className="label">Tipo</label>
                <div className="control">
                    <div className="select is-fullwidth">
                        <select
                            name="type"
                            value={this.state.element ? (this.state.element.type ? this.state.element.type : "") : ""}
                            onChange={(e) => { this.onChange(e) }}>
                            <option value="" selected disabled hidden>Escolha</option>
                            <option value="winner">Winner</option>
                            <option value="loser">Loser</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }

    private getTeamsField(): React.ReactNode {
        if (this.state.element) {
            this.addTeam();

            let players = this.state.element.teamInfo ? this.state.element.teamInfo.map((teamInfo, i) => this.getSingleTeamField(teamInfo, i)) : null;

            return (
                <React.Fragment>
                    <br />
                    <label className="label">Times</label>
                    {players}
                    <button className="button is-fullwidth" type="button" onClick={() => { this.addTeam(true) }}>Adicionar</button>
                </React.Fragment>
            );
        } else {
            return null;
        }
    }

    private getSingleTeamField(teamInfo: IMatchTeamInfo, i: number) {
        let style = {
            float: "right" as "right",
            cursor: "pointer"
        }

        return (
            <React.Fragment key={i}>
                <div className="field">
                    <label className="label">
                        Nome
                    {i > 1 ?
                            <span className="icon is-right" style={style} onClick={() => { this.removeTeam(i) }}>
                                <FontAwesomeIcon icon="times" />
                            </span> : null}
                    </label>
                    <div className="control">
                        <input autoFocus
                            className="input"
                            type="text"
                            name="teamName"
                            value={teamInfo.teamName}
                            onChange={(e) => { this.onChangeTeamProperty(e, i) }}
                            list={`teamInfo${i}`} />
                        {this.getTeamDataList(i)}
                    </div>
                </div>
                <div className="groupFields">
                    <div className="field">
                        <label className="label">Posição</label>
                        <div className="control">
                            <input autoFocus
                                className="input"
                                type="number"
                                name="index"
                                autoComplete="off"
                                min="1"
                                value={teamInfo.index}
                                onChange={(e) => { this.onChangeTeamProperty(e, i) }} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Vitórias</label>
                        <div className="control">
                            <input
                                className="input"
                                type="number"
                                name="score"
                                autoComplete="off"
                                min="0"
                                value={teamInfo.score}
                                onChange={(e) => { this.onChangeTeamProperty(e, i) }} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    private getTeamDataList(i: number) {
        return (
            <datalist id={`teamInfo${i}`}>
                {this.teamList.map((x, i) => <option key={i} value={x.name} />)}
            </datalist>
        );
    }

    private onChangeTeamProperty(e: any, i: number): void {
        if (this.state.element && this.state.element.teamInfo) {
            const target = e.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;

            const existingInfoArray = this.state.element.teamInfo;

            let teamInfo = existingInfoArray[i];

            if (teamInfo) {
                existingInfoArray[i] = { ...teamInfo, [name]: value };
            }

            const val: any = { ...this.state.element, teamInfo: existingInfoArray };

            this.setState({
                element: val,
                dirty: true
            });
        }
    }

    private addTeam(isClick?: boolean) {
        if (this.state.element) {
            // If the array is empty, add at least two teams
            if ((!this.state.element.teamInfo || this.state.element.teamInfo.length < 1) && !isClick) {
                this.state.element.teamInfo = [];
                this.state.element.teamInfo.push({ teamName: "", index: this.state.element.teamInfo.length + 1 });
                this.state.element.teamInfo.push({ teamName: "", index: this.state.element.teamInfo.length + 1 });
            } else if (this.state.element.teamInfo && isClick) {
                this.state.element.teamInfo.push({ teamName: "" });
                this.setState({ element: this.state.element });
            }
        }
    }

    private removeTeam(i: number) {
        if (this.state.element) {
            if (this.state.element.teamInfo) {
                this.state.element.teamInfo.splice(i, 1);
                this.setState({ element: this.state.element });
            }
        }
    }
}

export default MatchsForm;
