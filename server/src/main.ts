// Native
import * as fs from "fs";

// Third party
import * as socketIo from "socket.io";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

// Own entityes
import { IConfig } from "./IConfig";
import { PlayerService } from "./services/PlayerService";
import { EntityService } from "./services/EntityService";
import { IPlayer } from "./entities/IPlayer";

const config: IConfig = JSON.parse(fs.readFileSync(`./config.${process.env.NODE_ENV || "development"}.json`, 'utf8'));

const io = socketIo(config.socketPort);
const app = express();

app.use(bodyParser.json({}));
app.use(cors());

const playerService = new EntityService<IPlayer>("player");

playerService.bindQueue(io);
playerService.bindEndpoints(app);

app.listen(config.serverPort, () => {
    console.log(`Server running at port ${config.serverPort}`)
});