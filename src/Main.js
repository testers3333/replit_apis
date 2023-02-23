const { Client } = require("discord.js");
const EventEmitter = require("events");
const express = require("express");
const { readdirSync } = require("fs");
const { QuickDB } = require("quick.db");

class ApisBuilder extends EventEmitter {
    constructor() {
        super({captureRejections: true});
        this.apis = {
            list: [],
            count: 0
        };
        this.ping = 0;
        this.ready = false;
        this.path = "/Routes/";
        this.express = express;
        this.app = null;
        this.spaces = null;
        this.db = new QuickDB();
        this.client = new Client({intents: 3276799});
        this.client.login(process.env["bot_token"]);
    }

    /**
     * 
     * @returns true si l'application est connectée sinon false.
     */
    async isReady() {
        return this.ready;
    }

    async loadApis() {
        let folders = readdirSync(__dirname+this.path);
        for(const folder of folders) {
            let files = readdirSync(__dirname+this.path+`${folder}`);
            for(const file of files) {
                if(!file.endsWith(".js")) return;
                let d = await require(__dirname+this.path+`${folder}/${file}`);
                this.app[d.method.toLowerCase()](d.path, async (req, res) => d.run(req, res, this));
                console.log(`[${d.method.toUpperCase()}] L'api ${d.path} a chargé.`);
                this.apis.count++;
                this.apis.list.push({...d.method, ...d.path});
            }
        }
    }

    /**
     * 
     * @param {Number} spaces
     * @returns this
     */
    async setJsonSpaces(spaces) {
        if(!spaces) {
            throw new Error("[SPACES NUMBER] L'argument spaces de ApisBuilder().setJsonSpaces() doit-être un nombre valide.");
        }
        if(typeof spaces !== "number") {
            throw new Error("[SPACES NUMBER] L'argument spaces de ApisBuilder().setJsonSpaces() doit-être un nombre valide.");
        }

        this.spaces = spaces;
        return this;
    }

    async start() {
        this.app = this.express();
        this.app.use(this.express.json());

        if(this.spaces) {
            this.app.set("json spaces", this.spaces);
        }

        let a = Date.now();
        this.app.listen(8080, () => {
            console.log("api connecté.");
            this.ready = true;
            this.ping = Date.now() - a;
        })
        this.loadApis();
        this.setJsonSpaces(2);
    }
}

module.exports = new ApisBuilder();