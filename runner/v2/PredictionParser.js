import fs from 'fs';
import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
import MetaCsvReader from "../../src/libs/meta/MetaCsvReader.js";
import MetaJsonReader from "../../src/libs/meta/MetaJsonReader.js";
import BufferProcessor from '../../src/libs/meta/BufferProcessor.js';
import BufferProcessorTypeEnum from '../../src/libs/meta/enum/BufferProcessorTypeEnum.js';
import ProfileFiller from './ProfileFiller.js';
import { fill } from '@tensorflow/tfjs';

PouchDB.plugin(find);

const META_SOURCE = './data/export/meta.json';

/**
 * 
 */
export default class PredictionParser {
    constructor() {
        this.meta = JSON.parse(fs.readFileSync(META_SOURCE));
    }

    async parse() {
        let dbObjects = [];
        for (let item of this.meta) {
            if (!['FIGHTERS', 'FIGHTS'].includes(item.type)) {
                throw Error('Unknown format META');
            }
            const buffer = await this.readFileByMeta(item);
            const bufferProcessor = new BufferProcessor(buffer, item);
            const objects = bufferProcessor.getDataObjects();
            dbObjects = dbObjects.concat(objects);
        }
        await this.storeToDb(dbObjects);
    }

    /**
     * @param {*} item 
     * @returns 
     */
    async readFileByMeta(item) {
        const metaCsvReader = new MetaCsvReader();
        const metaJsonReader = new MetaJsonReader();
        if (item.format === metaCsvReader.format) {
            return await metaCsvReader.readToBuffer(item);

        } else if (item.format === metaJsonReader.format) {
            return await metaJsonReader.readToBuffer(item);

        } else {
            throw Error('Unknown meta item format');
        }
    }

    /**
     * @param {BufferProcessorEntity[]} dbObjects 
     */
    async storeToDb(dbObjects) {
        const fightersDb = new PouchDB('data/db/fighters');
        const fightsDb = new PouchDB('data/db/fights');

        for (let item of dbObjects) {
            if (item.type === BufferProcessorTypeEnum.FIGHTER) {
                if (!item.object.name) {
                    console.error('Bad or empty fighter name', item.object);
                    continue;
                }
                let dbItem = null;
                try {
                    dbItem = await fightersDb.get(item.object.name.toLowerCase());
                } catch (e) {}
                if (dbItem) {
                    if (dbItem.merged.includes(item.object.constructor.name)) {
                        continue;
                    }
                    const assignedObject = Object.assign({}, dbItem.data, item.object);
                    dbItem.data = assignedObject;
                    dbItem.merged.push(item.object.constructor.name); 
                    await fightersDb.put(dbItem);
                } else {
                    await fightersDb.put({
                        _id: item.object.name.toLowerCase(),
                        data: item.object,
                        merged: [item.object.constructor.name],
                        fights: []
                    });
                }

            } else if (item.type === BufferProcessorTypeEnum.FIGHT) {
                if (!item.object.id) {
                    console.error('Bad fight id', item.object);
                    continue;
                }
                let dbItem = null;
                try {
                    dbItem = await fightsDb.get(item.object.id);
                } catch (e) {}
                if (!dbItem) {
                    await fightsDb.put({
                        _id: item.object.id,
                        data: item.object,
                        date: item.object.date
                    });
                }

                dbItem = null;
                try {
                    dbItem = await fightersDb.get(item.object.f1Name.toLowerCase());
                } catch (e) {}
                if (dbItem) {
                    dbItem.fights.push(item.object.id);
                    await fightersDb.put(dbItem);
                }
                
                dbItem = null;
                try {
                    dbItem = await fightersDb.get(item.object.f2Name.toLowerCase());
                } catch (e) {}
                if (dbItem) {
                    dbItem.fights.push(item.object.id);
                    await fightersDb.put(dbItem);
                }

            } else {
                console.log('Skipped item', item);
            }
        }
        fightersDb.createIndex({
            name: 'i_fighters',
            index: {fields: ['_id']}
        });
        fightsDb.createIndex({
            name: "i_date",
            index: {fields: ['date']}
        });
    }

    /**
     * 
     */
    async fillEmptyData() {
        const fightersDb = new PouchDB('data/db/fighters');
        const fighters = await fightersDb.find({
            selector: {
                $nor: [
                    {fights: {$size: 0}}
                ]
            },
            limit: 10
        });
        for (let doc of fighters.docs) {
            console.log('fillEmptyData fighter', doc);
            await (new ProfileFiller(doc)).fill();
        }
    }
}
