// @flow
import Web from './web';
import Database from './db';
import config from './config.json';

const db = new Database();

new Web(config.port, db);
