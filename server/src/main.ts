// Native
import * as fs from "fs";

// Third party
import * as socketIo from "socket.io";

// Own entityes
import { IConfig } from "./IConfig";
import { PlayerService } from "./services/PlayerService";

const config: IConfig = JSON.parse(fs.readFileSync(`./config.${process.env.NODE_ENV || "development"}.json`, 'utf8'));

const io = socketIo(config.socketPort);
var playerService = new PlayerService();

playerService.bindQueue(io);
