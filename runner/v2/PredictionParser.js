import fs from 'fs';
import PouchDB from 'pouchdb';
import MetaCsvReader from "../../src/libs/meta/MetaCsvReader.js";
import MetaJsonReader from "../../src/libs/meta/MetaJsonReader.js";
import BufferProcessor from '../../src/libs/meta/BufferProcessor.js';
import BufferProcessorTypeEnum from '../../src/libs/meta/enum/BufferProcessorTypeEnum.js';

const META_SOURCE = './data/export/meta.json';

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
        for (let item of dbObjects) {
            if (item.type === BufferProcessorTypeEnum.FIGHTER) {
                if (!item.object.name) {
                    console.error('Bad or empty fighter name', item.object);
                    continue;
                }
                let dbItem = null;
                try {
                    dbItem = await fightersDb.get(item.object.name);
                } catch (e) {}
                if (dbItem) {
                    console.log(dbItem);
                    break;
                } else {
                    await fightersDb.put({
                        _id: item.object.name,
                        data: item.object
                    });
                }
            } else {
                break;
            }
        }
        //
        //db.put(doc);
    }
}
