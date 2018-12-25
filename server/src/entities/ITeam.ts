import { IPlayer } from "./IPlayer";

export interface ITeam {
    _id: string;

    name: string;

    logoUrl: string;

    tag: string;

    players: IPlayer[];
}
