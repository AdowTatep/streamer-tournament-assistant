export interface IMatchTeamInfo {
    index?: number;
    score?: number;
    teamName: string;
}

export interface IMatch {
    _id?: string;
    isActive?: boolean;
    type?: string;
    bestOf?: number
    index?: number;
    teamInfo?: IMatchTeamInfo[];
    tournamentName: string;
}