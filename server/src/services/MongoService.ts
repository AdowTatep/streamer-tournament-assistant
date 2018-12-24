import * as fs from "fs";
import { MongoClient, Collection } from "mongodb";
import { IConfig } from "./../IConfig";

const config: IConfig = JSON.parse(fs.readFileSync(`./config.${process.env.NODE_ENV || "development"}.json`, 'utf8'));

const mongoCollection = <T>(databaseName: string, collectionName: string): Promise<Collection<T>> => {
    return new Promise((resolve, reject) => {
        new MongoClient(config.mongoUrl)
            .connect()
            .then(cli => {
                resolve(cli.db(databaseName).collection(collectionName));
            })
            .catch(reject);
    });
}

export default mongoCollection;