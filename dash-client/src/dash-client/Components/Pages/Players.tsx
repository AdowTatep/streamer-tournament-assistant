import * as React from 'react';
import "./Players.scss";
import { IPlayer } from '../../Entities/IPlayer';
import { PlayersStore } from '../../Stores/PlayersStore';
import PlayersTable from '../Elements/Players/PlayersTable';
import PlayersForm from '../Elements/Players/PlayersForm';
import ElementCrud from '../Elements/ElementCrud';

type PlayersCrud = new () => ElementCrud<IPlayer, IState>;
const PlayersCrud = ElementCrud as PlayersCrud;

interface IProps {
}

interface IState {
    players: IPlayer[];
    selectedPlayer: number;
}

export default class Players extends React.Component<IProps, IState> {
    store: PlayersStore;

    constructor(props: IProps) {
        super(props);
        this.store = new PlayersStore();
        this.state = { players: this.store.playerList, selectedPlayer: -1 }
    }

    public componentDidMount() {
        this.store.on("playerListUpdate", (event) => { this.updatePlayerList(event); })
    }

    public render() {
        return (
            <div className={`component-players`}>
                <PlayersCrud
                    elements={this.state.players}
                    selectedElement={this.state.selectedPlayer}
                    createElement={(element) => { this.onPlayerCreate(element) }}
                    updateElement={(element, i) => { this.onPlayerUpdate(element, i) }}
                    deleteElement={(element, i) => { this.onPlayerDelete(element, i) }}
                    elementTable={
                        <PlayersTable players={this.state.players} onPlayerSelected={(player, i) => { this.onPlayerSelected(player, i); }} />
                    }
                    elementForm={this.getForm()}
                />
            </div>
        );
    }
    getForm(): any {
        return PlayersForm;
    }

    private onPlayerCreate(element: IPlayer): void {
        this.state.players.push(element);
        this.updatePlayerList(this.state.players);
        this.store.insertPlayer(element);
    }

    private onPlayerUpdate(element: IPlayer, i: number): void {
        this.state.players[i] = element;
        this.updatePlayerList(this.state.players);
        this.store.updatePlayer(element);
    }

    private onPlayerDelete(player: IPlayer, i: number): void {
        // Get every that isn't the deleted
        // Refresh list
        this.updatePlayerList(this.state.players.filter((x, i) => i !== i));
        this.store.deletePlayer(this.state.players[i]);
    }

    private onPlayerSelected(player: IPlayer, i: number): void {
        if (this.state.selectedPlayer === i) {
            this.setState({ selectedPlayer: -1 });
        } else {
            this.setState({ selectedPlayer: i });
        }
    }

    private updatePlayerList(players: IPlayer[]): void {
        this.store.playerList = players;
        this.setState({ players });
    }
}
