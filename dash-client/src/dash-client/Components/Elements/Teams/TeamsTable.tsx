import * as React from 'react';
import TableColumn from '../../UI/TableColumn';
import SelectableTable from '../../UI/SelectableTable';
import { ITeam } from '../../../Entities/ITeam';

type teamsSelectableTable = new () => SelectableTable<ITeam>;
const TeamsSelectableTable = SelectableTable as teamsSelectableTable;

interface IProps {
    teams: ITeam[];
    onteamSelected?: (team: ITeam, i: number) => void;
    onteamDoubleClick?: (team: ITeam, i: number) => void;
}

class TeamsTable extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <div className={`component-teamsTable`}>
                <TeamsSelectableTable
                    getColumns={(element) => { return this.getTeamsColumns(element) }}
                    getHeaders={() => { return this.getTeamsHeaders() }}
                    onSelected={(element, i) => { this.selectTeam(element, i) }}
                    rows={this.props.teams}
                />
            </div>
        );
    }

    private getTeamsHeaders(): TableColumn[] {
        return (
            <React.Fragment>
                <TableColumn header={true}>Nome</TableColumn>
                <TableColumn header={true}>Tag</TableColumn>
                <TableColumn header={true}>Jogadores</TableColumn>
            </React.Fragment>
        ) as unknown as TableColumn[];
    }

    private getTeamsColumns(team: ITeam): TableColumn[] {
        return (
            <React.Fragment>
                <TableColumn key={team.name}>{team.name}</TableColumn>
                <TableColumn key={team.tag}>{team.tag}</TableColumn>
                <TableColumn key={this.getPlayersNames(team)}>{this.getPlayersNames(team)}</TableColumn>
            </React.Fragment>
        ) as unknown as TableColumn[];
    }

    private selectTeam(team: ITeam, i: number): void {
        if (this.props.onteamSelected)
            this.props.onteamSelected(team, i);
    }

    private getPlayersNames(team: ITeam): string {
        if (team.players && team.players.length > 0) {
            return team.players.reduce((p, c, i) => `${p}${c.name}${i === (team.players as []).length - 1 ? "." : ", "}`, "");
        } else {
            return "";
        }
    }
}

export default TeamsTable;
