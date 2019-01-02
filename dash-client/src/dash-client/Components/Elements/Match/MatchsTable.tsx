import * as React from 'react';
import TableColumn from '../../UI/TableColumn';
import SelectableTable from '../../UI/SelectableTable';
import { IMatch } from '../../../Entities/IMatch';
import { ITeam } from '../../../Entities/ITeam';
import { EntityStore } from '../../../Stores/EntityStore';

type matchsSelectableTable = new () => SelectableTable<IMatch>;
const MatchsSelectableTable = SelectableTable as matchsSelectableTable;

interface IProps {
    matchs: IMatch[];
    onMatchSelected?: (team: IMatch, i: number) => void;
    onteamDoubleClick?: (team: IMatch, i: number) => void;
}

class MatchsTable extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <div className={`component-matchsTable`}>
                <MatchsSelectableTable
                    getColumns={(element) => { return this.getMatchsColumns(element) }}
                    getHeaders={() => { return this.getMatchsHeaders() }}
                    onSelected={(element, i) => { this.selectMatch(element, i) }}
                    rows={this.props.matchs}
                />
            </div>
        );
    }

    private getMatchsHeaders(): TableColumn[] {
        return (
            <React.Fragment>
                <TableColumn header={true}>Index</TableColumn>
                <TableColumn header={true}>Melhor de</TableColumn>
                <TableColumn header={true}>Tipo</TableColumn>
                <TableColumn header={true}>Times</TableColumn>
            </React.Fragment>
        ) as unknown as TableColumn[];
    }

    private getMatchsColumns(match: IMatch): TableColumn[] {
        return (
            <React.Fragment>
                <TableColumn key={match.index}>{match.index}</TableColumn>
                <TableColumn key={match.bestOf}>{match.bestOf}</TableColumn>
                <TableColumn key={match.type}>{match.type}</TableColumn>
                <TableColumn key={this.getTeamInfo(match)}>{this.getTeamInfo(match)}</TableColumn>
            </React.Fragment>
        ) as unknown as TableColumn[];
    }

    private selectMatch(match: IMatch, i: number): void {
        if (this.props.onMatchSelected)
            this.props.onMatchSelected(match, i);
    }

    private getTeamInfo(match: IMatch): string {
        if (match.teamInfo && match.teamInfo.length > 0) {
            return match.teamInfo.reduce((p, c, i) => `${p}${(c.score ? c.score : 0)}:${c.teamName}${i === (match.teamInfo as []).length - 1 ? "." : ", "}`, "");
        } else {
            return "";
        }
    }
}

export default MatchsTable;
