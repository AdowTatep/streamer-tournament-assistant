import * as React from 'react';
import TableColumn from '../../UI/TableColumn';
import { ITournament } from '../../../Entities/ITournament';
import SelectableTable from '../../UI/SelectableTable';

type TournamentsSelectableTable = new () => SelectableTable<ITournament>;
const TournamentsSelectableTable = SelectableTable as TournamentsSelectableTable;

interface IProps {
    tournaments: ITournament[];
    onTournamentSelected?: (player: ITournament, i: number) => void;
    onTournamentDoubleClick?: (player: ITournament, i: number) => void;
}

class TournamentsTable extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <div className={`component-playersTable`}>
                <TournamentsSelectableTable
                    getColumns={(element) => { return this.getPlayerColumns(element) }}
                    getHeaders={() => { return this.getPlayerHeaders() }}
                    onSelected={(element, i) => { this.selectPlayer(element, i) }}
                    rows={this.props.tournaments}
                />
            </div>
        );
    }

    private getPlayerHeaders(): TableColumn[] {
        return (
            <React.Fragment>
                <TableColumn header={true}>Nome</TableColumn>
                <TableColumn header={true}>Ativo</TableColumn>
            </React.Fragment>
        ) as unknown as TableColumn[];
    }

    private getPlayerColumns(tournament: ITournament): TableColumn[] {
        return (
            <React.Fragment>
                <TableColumn key={tournament.name}>{tournament.name}</TableColumn>
                <TableColumn key={tournament.isActive ? tournament.isActive.toString() : "false"}>{tournament.isActive ? tournament.isActive.toString() : "false"}</TableColumn>
            </React.Fragment>
        ) as unknown as TableColumn[];
    }

    private selectPlayer(tournament: ITournament, i: number): void {
        if (this.props.onTournamentSelected)
            this.props.onTournamentSelected(tournament, i);
    }
}

export default TournamentsTable;
