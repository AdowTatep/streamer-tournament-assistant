import * as React from 'react';
import ElementForm from '../ElementForm';
import { ITeam } from '../../../Entities/ITeam';
import { IPlayer } from '../../../Entities/IPlayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { EntityStore } from '../../../Stores/EntityStore';

class TeamsForm extends ElementForm<ITeam> {

    playersStore: EntityStore<IPlayer> = new EntityStore<IPlayer>("player");
    playerList: IPlayer[] = [];

    public componentDidMount() {
        this.playersStore
            .retrieveEntities()
            .then(players => this.playerList = players);
    }

    public getFields(): React.ReactNode {
        return (
            <React.Fragment>
                {this.getNameField()}
                {this.getTagField()}
                {this.getPlayersField()}
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

            if (!this.state.element.tag || this.state.element.tag.length < 2 || this.state.element.tag.length > 4) {
                validation.valid = false;
                validation.errors.push({ name: "default", error: "É preciso ter no mínimo de 2 a 3 caracteres na tag" });
            }

            if (!this.state.element.players || this.state.element.players.length < 1) {
                validation.valid = false;
                validation.errors.push({ name: "default", error: "É preciso ter no 1 jogador em um time" });
            } else if (this.state.element.players && this.state.element.players.some(x => !x.name || x.name.length < 3)) {
                validation.valid = false;
                validation.errors.push({ name: "default", error: "Um jogador precisa ter no mínimo 3 caracteres no nome" });
            }
        }

        return validation;
    }

    private getPlayersField(): React.ReactNode {
        if (this.state.element) {
            this.addPlayer();

            let players = this.state.element.players ? this.state.element.players.map((player, i) => this.getSinglePlayerField(player, i)) : null;

            return (
                <React.Fragment>
                    <br />
                    <label className="label">Jogadores</label>
                    {players}
                    <button className="button is-fullwidth" type="button" onClick={() => { this.addPlayer(true) }}>Adicionar</button>
                </React.Fragment>
            );
        } else {
            return null;
        }
    }

    private getSinglePlayerField(player: IPlayer, i: number) {
        let style = {
            float: "right" as "right",
            cursor: "pointer"
        }
        return (
            <div className="field" key={i}>
                <label className="label">
                    Nome
                    {i > 0 ?
                        <span className="icon is-right" style={style} onClick={() => { this.removePlayer(i) }}>
                            <FontAwesomeIcon icon="times" />
                        </span> : null}
                </label>
                <div className="control">
                    <input autoFocus
                        className="input"
                        type="text"
                        value={player.name}
                        onChange={(e) => { this.onPlayerChange(e, i) }}
                        list={`player${i}`} />
                    {this.getPlayerDataList(i)}
                </div>
            </div>
        );
    }

    private getPlayerDataList(i: number) {
        return (
            <datalist id={`player${i}`}>
                {this.playerList.map((x, i) => <option key={i} value={x.name} />)}
            </datalist>
        );
    }

    onPlayerChange(e: any, i: number): any {
        if (this.state.element) {
            let content = this.state.element.players;

            if (content) {
                content[i].name = e.target.value.toString().trim();
            }

            const val: any = { ...this.state.element, players: content };

            this.setState({
                element: val,
                dirty: true
            });
        }
    }

    private getNameField() {
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

    private getTagField(): React.ReactNode {
        return (
            <div className="field">
                <label className="label">Tag</label>
                <div className="control">
                    <input autoFocus
                        className="input"
                        type="text"
                        name="tag"
                        value={this.state.element ? (this.state.element.tag ? this.state.element.tag : "") : ""}
                        onChange={(e) => { this.onChange(e) }} />
                </div>
            </div>
        );
    }

    private addPlayer(isClick?: boolean) {
        if (this.state.element) {
            // If the array is empty, add at least one player
            if ((!this.state.element.players || this.state.element.players.length < 1) && !isClick) {
                this.state.element.players = [];
                this.state.element.players.push({ _id: "", name: "" });
            } else if (this.state.element.players && isClick) {
                this.state.element.players.push({ _id: "", name: "" });
                this.setState({ element: this.state.element });
            }
        }
    }

    private removePlayer(i: number) {
        if (this.state.element) {
            if (this.state.element.players) {
                this.state.element.players.splice(i, 1);
                this.setState({ element: this.state.element });
            }
        }
    }
}

export default TeamsForm;
