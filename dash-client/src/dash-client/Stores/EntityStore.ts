import { EventEmitter } from 'events';
import { DashConfiguration } from '../DashConfiguration';
import * as request from "request";

export class EntityStore<T> {
    private host: string;
    private storeEvents: EventEmitter = new EventEmitter();
    private namespace: string;

    constructor(namespace: string) {
        this.host = `${new DashConfiguration().server}/${namespace}s`;
        this.namespace = namespace;
    }

    public on(eventName: string, event: (event: any) => void): void {
        this.storeEvents.on(eventName, event);
    }

    public retrieveEntities(entity?: T): Promise<T[]> {
        return new Promise((resolve, reject) => {
            request.get(this.host, (error, resp, sbody) => {
                if (error || sbody === undefined || !sbody) {
                    reject(error);
                } else {
                    let body = JSON.parse(sbody);
                    resolve(body[this.namespace + "s"] || []);
                }
            })
        });
    }

    public createEntity(entity: T): Promise<T> {
        let body = JSON.stringify({ [this.namespace]: entity });
        let opts = { url: this.host, body: body, headers: { 'content-type': 'application/json' } };

        return new Promise((resolve, reject) => {
            request.post(opts, (error, resp, sbody) => {
                if (error || sbody === undefined || !sbody) {
                    reject(error);
                } else {
                    let body = JSON.parse(sbody);
                    resolve(body[this.namespace] || []);
                }
            })
        });
    }

    public updateEntity(entity: T): Promise<T> {
        let body = JSON.stringify({ [this.namespace]: entity });
        let opts = { url: this.host, body: body, headers: { 'content-type': 'application/json' } };
        return new Promise((resolve, reject) => {
            request.put(opts, (error, resp, sbody) => {
                if (error || sbody === undefined || !sbody) {
                    reject(error);
                } else {
                    let body = JSON.parse(sbody);
                    resolve(body[this.namespace] || []);
                }
            })
        });
    }

    public deleteEntity(entity: T): Promise<T> {
        let body = JSON.stringify({ [this.namespace]: entity });
        let opts = { url: this.host, body: body, headers: { 'content-type': 'application/json' } };
        return new Promise((resolve, reject) => {
            request.delete(opts, (error, resp, sbody) => {
                if (error || sbody === undefined || !sbody) {
                    reject(error);
                } else {
                    let body = JSON.parse(sbody);
                    resolve(body[this.namespace] || []);
                }
            })
        });
    }
}