import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
PouchDB.plugin(find);

export default class DbSearch {
    async run(query) {
        const fightersDb = new PouchDB('data/db/fighters');
        const fighters = await fightersDb.find({
            selector: {
                _id: query.toLowerCase()
            }
        });
        if (fighters.docs.length) {
            for (let doc of fighters.docs) {
                console.log(doc.data);
            }
        } else {
            console.log('fighters: No data found');
        }

        const fightsDb = new PouchDB('data/db/fights');
        const fights = await fightsDb.find({
            selector: {
                date: {$gt: null},
                $or: [
                    {'data.f1Name': query},
                    {'data.f2Name': query},
                ]
            },
            fields: ['date', 'data.f1Name', 'data.f2Name'],
            sort: ['date']
        });
        if (fights.docs.length) {
            console.log('--- Fights ---', fights.docs.length);
            for (let doc of fights.docs) {
                console.log(doc);
            }
        }
    }
}