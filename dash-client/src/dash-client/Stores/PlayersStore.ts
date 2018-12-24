import { IPlayer } from '../Entities/IPlayer';
import { EventEmitter } from 'events';
import { DashConfiguration } from '../DashConfiguration';
import * as request from "request";

export class PlayersStore {
    private host: string = `${new DashConfiguration().server}/players`;
    private storeEvents: EventEmitter = new EventEmitter();

    public on(eventName: "playerListUpdate", event: (event: any) => void): void {
        this.storeEvents.on(eventName, event);
    }

    public retrievePlayers(player?: IPlayer): Promise<IPlayer[]> {
        return new Promise((resolve, reject) => {
            request.get(this.host, (error, resp, sbody) => {
                if (error || sbody === undefined || !sbody) {
                    reject(error);
                } else {
                    let body = JSON.parse(sbody);
                    resolve(body.players || []);
                }
            })
        });
    }

    public createPlayer(player: IPlayer): Promise<IPlayer> {
        let body = JSON.stringify({ player });
        let opts = {
            url: this.host,
            body: body,
            headers: {
                'content-type': 'application/json'
            }
        };

        return new Promise((resolve, reject) => {
            request.post(opts, (error, resp, sbody) => {
                if (error || sbody === undefined || !sbody) {
                    reject(error);
                } else {
                    let body = JSON.parse(sbody);
                    resolve(body.player || []);
                }
            })
        });
    }

    public updatePlayer(player: IPlayer): Promise<IPlayer> {
        let body = JSON.stringify({ player });
        let opts = { url: this.host, body: body, headers: { 'content-type': 'application/json' } };
        return new Promise((resolve, reject) => {
            request.put(opts, (error, resp, sbody) => {
                if (error || sbody === undefined || !sbody) {
                    reject(error);
                } else {
                    let body = JSON.parse(sbody);
                    resolve(body.player || []);
                }
            })
        });
    }

    public deletePlayer(player: IPlayer): Promise<IPlayer> {
        let body = JSON.stringify({ player });
        let opts = { url: this.host, body: body, headers: { 'content-type': 'application/json' } };
        return new Promise((resolve, reject) => {
            request.delete(opts, (error, resp, sbody) => {
                if (error || sbody === undefined || !sbody) {
                    reject(error);
                } else {
                    let body = JSON.parse(sbody);
                    resolve(body.player || []);
                }
            })
        });
    }
}