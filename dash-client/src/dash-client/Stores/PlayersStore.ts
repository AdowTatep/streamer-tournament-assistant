import io from 'socket.io-client';
import { IPlayer } from '../Entities/IPlayer';
import { EventEmitter } from 'events';
import { DashConfiguration } from '../DashConfiguration';

export class PlayersStore {

    private socket: any;

    public playerList: IPlayer[] = [];

    private storeEvents: EventEmitter = new EventEmitter();

    constructor() {
        this.connect()
            .then(socket => {
                socket.on('playerListUpdate', () => {
                    this.storeEvents.emit("playerListUpdate", this.playerList);
                });
            });
    }

    public on(eventName: "playerListUpdate", event: (event: any) => void): void {
        this.storeEvents.on(eventName, event);
    }

    public insertPlayer(player: IPlayer) {
        this
            .connect()
            .then(socket => {
                socket.emit('create', player);
            })
    }

    public updatePlayer(player: IPlayer) {

    }

    public deletePlayer(player: IPlayer) {

    }

    private connect(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.socket) {
                let socket = io.connect(`${new DashConfiguration().socketUri}/players`);
                socket.on('connect', () => {
                    this.socket = socket;
                    resolve(socket);
                });
            } else {
                resolve(this.socket);
            }
        });
    }
}