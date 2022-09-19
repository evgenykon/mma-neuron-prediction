import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
PouchDB.plugin(find);

export default class DbSearch {
    async run(query) {
        const fightersDb = new PouchDB('data/db/fighters');
        const result = await fightersDb.find({
            selector: {
                _id: query.toLowerCase()
            }
        });
        if (result.docs.length) {
            for (let doc of result.docs) {
                console.log(doc.data);
            }
        } else {
            console.log('No data found');
        }
    }
}