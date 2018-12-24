import { IPlayer } from "../entities/IPlayer";
import * as socketIo from "socket.io";
import mongoCollection from "./MongoService";

export class PlayerService {

    public bindQueue(socket: socketIo.Server): socketIo.Namespace {
        return socket
            .of('/players')
            .on('connection', (socket) => {
                socket.on('create', (args: IPlayer) => {
                    this.create(args)
                        .then(result => {
                            //Dispatch "list updated"
                            socket.emit("playerListUpdate", this.retrieve());
                        })
                        .catch(console.error);
                });

                socket.on('retrieve', (args) => {
                    this.retrieve(args)
                        .then(result => {
                            //Dispatch result
                        })
                        .catch(console.error);
                });

                socket.on('update', (args) => {
                    this.update(args)
                        .then(result => {
                            //Dispatch result
                            socket.emit("playerListUpdate", this.retrieve());
                        })
                        .catch(console.error);
                });

                socket.on('delete', (args) => {
                    this.delete(args)
                        .then(result => {
                            //Dispatch result
                            socket.emit("playerListUpdate", this.retrieve());
                        })
                        .catch(console.error);
                });
            });
    }

    private create(player: IPlayer): Promise<any> {
        return new Promise((resolve, reject) => {
            mongoCollection<IPlayer>("tournament", "players")
                .then(collection => {
                    collection
                        .insert({ id: `player${Date.now()}`, ...player })
                        .then(x => {
                            resolve();
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }

    private retrieve(filter?: any): Promise<IPlayer[]> {
        return new Promise((resolve, reject) => {
            mongoCollection<IPlayer>("tournament", "players")
                .then(collection => {
                    collection
                        .find(filter)
                        .toArray()
                        .then(items => {
                            resolve(items);
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }

    private update(player: IPlayer): Promise<any> {
        return new Promise((resolve, reject) => {
            mongoCollection<IPlayer>("tournament", "players")
                .then(collection => {
                    collection
                        .update({ id: player.id }, player)
                        .then(result => {
                            resolve();
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }

    private delete(player: IPlayer): Promise<any> {
        return new Promise((resolve, reject) => {
            mongoCollection<IPlayer>("tournament", "players")
                .then(collection => {
                    collection
                        .update({ id: player.id }, player)
                        .then(result => {
                            resolve();
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }
}