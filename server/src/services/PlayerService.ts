import * as socketIo from "socket.io";
import * as express from "express";
import { IPlayer } from "../entities/IPlayer";
import mongoCollection from "./MongoService";

export class PlayerService {
    public bindEndpoints(app: express.Express): any {
        app.get('/players', (request, response) => {
            this.retrieve(request.query)
                .then(result => {
                    response.send({ success: true, players: result });
                })
                .catch((error) => {
                    response.status(500);
                    response.send({ success: false });
                });
        });

        app.post('/players', (request, response) => {
            if (request.body.player) {
                this.create(request.body.player)
                    .then(result => {
                        response.send({ success: true, player: result });
                    })
                    .catch((error) => {
                        response.status(500);
                        response.send({ success: false });
                    });
            } else {
                response.status(400);
                response.send({ success: false, message: "Body should not have an empty player" });
            }
        });

        app.put('/players', (request, response) => {
            if (request.body.player) {
                this.update(request.body.player)
                    .then(result => {
                        response.send({ success: true, players: result });
                    })
                    .catch((error) => {
                        response.status(500);
                        response.send({ success: false });
                    });
            } else {
                response.status(400);
                response.send({ success: false, message: "Body should not have an empty player" });
            }
        });

        app.delete('/players', (request, response) => {
            if (request.body.player) {
                this.delete(request.body.player)
                    .then(result => {
                        response.send({ success: true, players: result });
                    })
                    .catch((error) => {
                        response.status(500);
                        response.send({ success: false });
                    });
            } else {
                response.status(400);
                response.send({ success: false, message: "Body should not have an empty player" });
            }
        });
    }

    public bindQueue(socket: socketIo.Server): socketIo.Namespace | undefined {
        return undefined;
    }

    private create(player: IPlayer): Promise<IPlayer> {
        return new Promise((resolve, reject) => {
            mongoCollection<IPlayer>("tournament", "players")
                .then(collection => {
                    collection
                        .insert({ id: `player${Date.now()}`, ...player })
                        .then(x => {
                            if (x.insertedCount > 0) {
                                resolve(x.ops[0]);
                            } else {
                                reject(`Inserted ${x.insertedCount}`);
                            }
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