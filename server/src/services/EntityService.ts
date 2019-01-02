import * as socketIo from "socket.io";
import * as express from "express";
import mongoCollection from "./MongoService";
import { ObjectId } from "mongodb";

interface TEntity {
    _id: string;
}

export class EntityService<T extends TEntity> {
    private namespace: string;
    constructor(namespace: string) {
        this.namespace = namespace
    }

    public bindEndpoints(app: express.Express): any {
        app.get(`/${this.namespace}s`, (request, response) => {
            this.retrieve(request.query)
                .then(result => {
                    response.send({ success: true, [this.namespace + "s"]: result });
                })
                .catch((error) => {
                    console.error(`${this.namespace} EntityService => Retrieve: ${error}. With query ${request.query}`);
                    response.status(500);
                    response.send({ success: false });
                });
        });

        app.post(`/${this.namespace}s`, (request, response) => {
            if (request.body[this.namespace]) {
                this.create(request.body[this.namespace])
                    .then(result => {
                        response.send({ success: true, [this.namespace]: result });
                    })
                    .catch((error) => {
                        console.error(`${this.namespace} EntityService => Create: ${error}. With body ${request.body}`);
                        response.status(500);
                        response.send({ success: false });
                    });
            } else {
                response.status(400);
                response.send({ success: false, message: "Body should not have an empty entity" });
            }
        });

        app.put(`/${this.namespace}s`, (request, response) => {
            if (request.body[this.namespace]) {
                this.update(request.body[this.namespace])
                    .then(result => {
                        response.send({ success: true, [this.namespace]: result });
                    })
                    .catch((error) => {
                        console.error(`${this.namespace} EntityService => Update: ${error}. With body ${request.body}`);
                        response.status(500);
                        response.send({ success: false });
                    });
            } else {
                response.status(400);
                response.send({ success: false, message: "Body should not have an empty entity" });
            }
        });

        app.delete(`/${this.namespace}s`, (request, response) => {
            if (request.body[this.namespace]) {
                this.delete(request.body[this.namespace])
                    .then(result => {
                        response.send({ success: true, [this.namespace]: result });
                    })
                    .catch((error) => {
                        console.error(`${this.namespace} EntityService => Delete: ${error}. With body ${request.body}`);
                        response.status(500);
                        response.send({ success: false });
                    });
            } else {
                response.status(400);
                response.send({ success: false, message: "Body should not have an empty entity" });
            }
        });
    }

    public bindQueue(socket: socketIo.Server): socketIo.Namespace | undefined {
        return undefined;
    }

    private create(entity: T): Promise<T> {
        return new Promise((resolve, reject) => {
            mongoCollection<T>("tournament", `${this.namespace}s`)
                .then(collection => {
                    collection
                        .insertOne(entity)
                        .then(result => {
                            if (result.insertedCount > 0) {
                                resolve(result.ops[0]);
                            } else {
                                reject(`Inserted ${result.insertedCount}`);
                            }
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }

    private retrieve(filter?: any): Promise<T[]> {
        return new Promise((resolve, reject) => {
            mongoCollection<T>("tournament", `${this.namespace}s`)
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

    private update(entity: T): Promise<T> {
        return new Promise((resolve, reject) => {
            let id = new ObjectId(entity._id);
            delete entity._id;
            mongoCollection<T>("tournament", `${this.namespace}s`)
                .then(collection => {
                    collection
                        .updateOne({ _id: id }, { $set: entity })
                        .then(result => {
                            if (result.modifiedCount > 0) {
                                resolve({ ...entity, _id: id.toHexString() })
                            } else {
                                reject(`Modified ${result.modifiedCount}`);
                            }
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }

    private delete(entity: T): Promise<any> {
        return new Promise((resolve, reject) => {
            mongoCollection<T>("tournament", `${this.namespace}s`)
                .then(collection => {
                    collection
                        .deleteOne({ _id: new ObjectId(entity._id) })
                        .then(result => {
                            if (result.deletedCount && result.deletedCount > 0) {
                                resolve({ _id: entity._id });
                            } else {
                                reject(`Deleted ${result.deletedCount}`);
                            }
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }
}