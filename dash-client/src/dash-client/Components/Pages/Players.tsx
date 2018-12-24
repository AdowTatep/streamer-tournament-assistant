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
        this.state = { players: new Array<IPlayer>(), selectedPlayer: -1 }
    }

    public componentDidMount() {
        this.store.on("playerListUpdate", (event) => { this.updatePlayerList(event); })
        this.store
            .retrievePlayers()
            .then(players => {
                this.updatePlayerList(players);
            })
            .catch(console.error);
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
        //Keep old elements
        let oldPlayers = [...this.state.players];
        let newPlayers = [...this.state.players];

        // Push the new element and update the state
        newPlayers.push(element);
        this.updatePlayerList(newPlayers);

        // Try to really create the element
        this.store
            .createPlayer(element)
            .then(player => {
                // If the element was created, update the list again, but with the real data
                oldPlayers.push(player);
                this.updatePlayerList(oldPlayers);
            })
            .catch(err => {
                // If some error occurred, rollback
                this.updatePlayerList(oldPlayers);
                console.error(err);
            });

    }

    private onPlayerUpdate(element: IPlayer, i: number): void {
        //Keep old elements
        let oldPlayers = [...this.state.players];
        let newPlayers = [...this.state.players];

        // Update the element values and update the state
        newPlayers[i] = element;
        this.updatePlayerList(newPlayers);

        this.store.updatePlayer(element)
            .then(player => {
                // If succeeded, update the list again, but with the real data
                oldPlayers.push(player);
                this.updatePlayerList(oldPlayers);
            })
            .catch(err => {
                // If some error occurred, rollback
                this.updatePlayerList(oldPlayers);
                console.error(err);
            });
    }

    private onPlayerDelete(player: IPlayer, i: number): void {
        //Keep old elements
        let oldPlayers = [...this.state.players];
        let newPlayers = [...this.state.players];

        // Get every that isn't the deleted
        newPlayers = newPlayers.filter((x, ind) => ind !== i)
        this.updatePlayerList(newPlayers);

        // Refresh list
        this.store.deletePlayer(this.state.players[i])
            .then(player => {
                // If succeeded, update the list again, but with the real data
                oldPlayers.push(player);
                this.updatePlayerList(oldPlayers);
            })
            .catch(err => {
                // If some error occurred, rollback
                this.updatePlayerList(oldPlayers);
                console.error(err);
            });
    }

    private onPlayerSelected(player: IPlayer, i: number): void {
        if (this.state.selectedPlayer === i) {
            this.setState({ selectedPlayer: -1 });
        } else {
            this.setState({ selectedPlayer: i });
        }
    }

    private updatePlayerList(players: IPlayer[]): void {
        this.setState({ players });
    }
}
