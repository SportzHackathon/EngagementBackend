// @flow
import express from 'express';
import http from 'http';
import type Database from './db';

class Web {

    port: number;

    db: Database;

    app: express.application;

    server: http.Server;

    constructor(port: number, db: Database) {
        this.port = port;
        this.db = db;
        this.initApp();
        this.routes();
        this.initServer();
        this.startServer();
    }

    initApp() {
        this.app = express();
    }

    routes() {
        this.app.get('/articles', (req, res) => {
            this.db.getArticles()
                .then(articles => res.json(articles))
                .catch(err => res.status(500).send(err.toString()));
        });
    }

    initServer() {
        this.server = http.createServer(this.app);
    }

    startServer() {
        this.server.listen(this.port, () => {
            console.log(`Listening on *:${this.port}`);
        });
    }
}

export default Web;
