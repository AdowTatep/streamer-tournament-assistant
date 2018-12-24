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
                {this.getPlayersField()}
            </React.Fragment>
        );
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
                content[i].name = e.target.value;
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
                        onChange={(e) => { this.onChange(e) }}
                        list="teams" />
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
