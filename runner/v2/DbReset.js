import PouchDB from 'pouchdb';

export default class DbReset {
    run() {
        new PouchDB('data/db/fighters').destroy();
    }
}