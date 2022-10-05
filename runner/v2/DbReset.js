import PouchDB from 'pouchdb';

export default class DbReset {
    run() {
        new PouchDB('data/db/fighters').destroy();
        new PouchDB('data/db/fights').destroy();
        new PouchDB('data/db/dictionaries').destroy();
    }
}