import io from 'socket.io-client';
import { IPlayer } from '../Entities/IPlayer';
import { EventEmitter } from 'events';
import { DashConfiguration } from '../DashConfiguration';

export class PlayersStore {

    private socket: any;

    public playerList: IPlayer[] = [];

    private storeEvents: EventEmitter = new EventEmitter();

    constructor() {
        this.playerList.push({ name: 'joao' });
        this.storeEvents.emit("playerListUpdate", this.playerList);
        setInterval(() => {
            this.playerList.push({ name: 'joao' });
            this.storeEvents.emit("playerListUpdate", this.playerList);
        }, 10000);

        this.connect()
            .then(socket => {
                socket.on('playerListUpdate', () => {
                    this.storeEvents.emit("playerListUpdate", this.playerList);
                });

                this.socket = socket;
            })
    }

    public on(eventName: "playerListUpdate", event: (event: any) => void): void {
        this.storeEvents.on(eventName, event);
    }

    public createPlayer() {

    }

    private connect(): Promise<any> {
        return new Promise((resolve, reject) => {
            let socket = io.connect(`${new DashConfiguration().socketUri}/players`);
            socket.on('connect', () => {
                resolve(socket);
            });
        });
    }
}