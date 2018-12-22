// Native
import * as fs from "fs";

// Third party
import * as socketIo from "socket.io";
import { MongoClient, Collection } from "mongodb";

// Own entityes
import { IConfig } from "./IConfig";
import { IPlayer } from "./entities/Player";

const config: IConfig = JSON.parse(fs.readFileSync(`./config.${process.env.NODE_ENV}.json`, 'utf8'));

const connectMongo = <T>(databaseName: string, collectionName: string): Promise<Collection<T>> => {
    return new Promise((resolve, reject) => {
        let client = new MongoClient(config.mongoUrl);
        client
            .connect()
            .then(cli => {
                resolve(cli.db(databaseName).collection(collectionName));
            })
    });
}

const io = socketIo(config.socketPort);
io
    .of('/players')
    .on('connection', (socket) => {
        socket.on('create', (args) => {
            connectMongo<IPlayer>("tournament", "players")
                .then(collection => {
                    collection.insert({ name: 'jhon' })
                    socket.emit('created', true);
                })
        });

        socket.on('find', (args) => {
            connectMongo<IPlayer>("tournament", "players")
                .then(collection => {
                    collection
                        .find({ name: 'jhon' })
                        .toArray()
                        .then(items => {
                            socket.emit('found', items);
                        })
                })
        });
    });