import * as React from 'react';
import "./Players.scss";
import Table from '../UI/Table';
import TableRow from '../UI/TableRow';
import { IPlayer } from '../../Entities/IPlayer';
import { PlayersStore } from '../../Stores/PlayersStore';
import TableColumn from '../UI/TableColumn';
import FixedColumn from '../Layout/FixedColumn';
import Card from '../UI/Card';

interface IProps {
}

interface IState {
    players: IPlayer[];
}

export default class Players extends React.Component<IProps, IState> {
    store: PlayersStore;

    constructor(props: IProps) {
        super(props);
        this.store = new PlayersStore();
        this.state = { players: this.store.playerList }
    }

    public componentDidMount() {
        this.store.on("playerListUpdate", (event) => { this.updatePlayerList(event); })
    }

    public render() {
        return (
            <div className={`component-players`}>
                <FixedColumn
                    body={(
                        <Card>
                            <Table rows={this.getPlayersRows(this.state.players)} header={this.getPlayerHeaders()} />
                        </Card>
                    )}

                    column={(
                        <div>
                            <div className="level">
                                <div className="level-left">
                                    <button className="button">Editar</button>
                                </div>
                                <div className="level-right">
                                    <button className="button">Apagar</button>
                                </div>
                            </div>

                            <Card className="form-card" light={true}>
                                <button className="submit-btn button is-fullwidth">Confirmar</button>
                            </Card>
                        </div>
                    )}
                />
            </div>
        );
    }
    private getPlayerHeaders(): TableColumn[] {
        return (
            <TableColumn header={true}>Nome</TableColumn>
        ) as unknown as TableColumn[];
    }

    private getPlayersRows(players: IPlayer[]): TableRow[] {
        return players.map((player, i) =>
            (<TableRow key={i} columns={this.getPlayerColumns(player)}></TableRow>) as unknown as TableRow
        );
    }

    private getPlayerColumns(player: IPlayer): TableColumn[] {
        return (
            <TableColumn key={player.name}>{player.name}</TableColumn>
        ) as unknown as TableColumn[];
    }

    private updatePlayerList(players: IPlayer[]): void {
        this.setState({ players });
    }
}
