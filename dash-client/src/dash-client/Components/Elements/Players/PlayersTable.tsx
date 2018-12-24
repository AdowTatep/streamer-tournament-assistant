import * as React from 'react';
import TableColumn from '../../UI/TableColumn';
import { IPlayer } from '../../../Entities/IPlayer';
import SelectableTable from '../../UI/SelectableTable';

type PlayersSelectableTable = new () => SelectableTable<IPlayer>;
const PlayersSelectableTable = SelectableTable as PlayersSelectableTable;

interface IProps {
    players: IPlayer[];
    onPlayerSelected?: (player: IPlayer, i: number) => void;
    onPlayerDoubleClick?: (player: IPlayer, i: number) => void;
}

class PlayersTable extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <div className={`component-playersTable`}>
                <PlayersSelectableTable
                    getColumns={(element) => { return this.getPlayerColumns(element) }}
                    getHeaders={() => { return this.getPlayerHeaders() }}
                    onSelected={(element, i) => { this.selectPlayer(element, i) }}
                    rows={this.props.players}
                />
            </div>
        );
    }

    private getPlayerHeaders(): TableColumn[] {
        return (
            <TableColumn header={true}>Nome</TableColumn>
        ) as unknown as TableColumn[];
    }

    private getPlayerColumns(player: IPlayer): TableColumn[] {
        return (
            <TableColumn key={player.name}>{player.name}</TableColumn>
        ) as unknown as TableColumn[];
    }

    private selectPlayer(player: IPlayer, i: number): void {
        if (this.props.onPlayerSelected)
            this.props.onPlayerSelected(player, i);
    }
}

export default PlayersTable;
