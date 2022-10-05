import fs from 'fs';
import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
import MetaCsvReader from "../../src/libs/meta/MetaCsvReader.js";
import MetaJsonReader from "../../src/libs/meta/MetaJsonReader.js";
import BufferProcessor from '../../src/libs/meta/BufferProcessor.js';
import BufferProcessorTypeEnum from '../../src/libs/meta/enum/BufferProcessorTypeEnum.js';
import ProfileFiller from './ProfileFiller.js';
import FightEntity from '../../src/libs/entities/v2/FightEntity.js';
import FightDictionaries from '../../src/libs/entities/v2/FightDictionaries.js';
import FighterEntityL1 from '../../src/libs/entities/v2/FighterEntityL1.js';
import Brain from '../../src/libs/networks/Brain.js';

PouchDB.plugin(find);

const META_SOURCE = './data/export/meta.json';

/**
 * 
 */
export default class PredictionParser {
    constructor() {
        this.meta = JSON.parse(fs.readFileSync(META_SOURCE));
        this.fightersDb = new PouchDB('data/db/fighters');
        this.fightsDb = new PouchDB('data/db/fights');
        this.dictionaries = new PouchDB('data/db/dictionaries');

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
        
        for (let item of dbObjects) {
            if (item.type === BufferProcessorTypeEnum.FIGHTER) {
                if (!item.object.name) {
                    console.error('Bad or empty fighter name', item.object);
                    continue;
                }
                await this.upsertFighter(item);

                await this.upsertDictionaryWeightCategory(item.object);

            } else if (item.type === BufferProcessorTypeEnum.FIGHT) {
                if (!item.object.id) {
                    console.error('Bad fight id', item.object);
                    continue;
                }

                await this.upsertFight(item);

                await this.addFightToFighter(item.object.f1Name, item.object.id);

                await this.addFightToFighter(item.object.f2Name, item.object.id);

                await this.upsertDictionaryWinCatalog(item.object);
                

            } else {
                console.log('Skipped item', item);
            }
        }
        this.fightersDb.createIndex({
            name: 'i_fighters',
            index: {fields: ['_id']}
        });
        this.fightsDb.createIndex({
            name: "i_date",
            index: {fields: ['date']}
        });
    }

    /**
     * 
     */
    async fillEmptyData() {
        const fighters = await this.fightersDb.find({
            selector: {
                $nor: [
                    {fights: {$size: 0}}
                ]
            },
            limit: 10
        });

        const winsDictionary = await this.dictionaries.get('WIN_CATALOG');
        const weightCategory = await this.dictionaries.get('WEIGHT_CATEGORY');
        const dictionaries = new FightDictionaries(winsDictionary.list, weightCategory.list);
        const brain = new Brain();
        for (let doc of fighters.docs) {
            await (new ProfileFiller(doc, dictionaries, brain)).fill();
        }
    }

    /**
     * @param {*} item 
     * @returns 
     */
    async upsertFighter(item) {
        let dbItem = null;
        try {
            dbItem = await this.fightersDb.get(item.object.name.toLowerCase());
        } catch (e) {}
        if (dbItem) {
            if (dbItem.merged.includes(item.object.constructor.name)) {
                return;
            }
            const assignedObject = Object.assign({}, dbItem.data, item.object);
            dbItem.data = assignedObject;
            dbItem.merged.push(item.object.constructor.name); 
            await this.fightersDb.put(dbItem);
        } else {
            await this.fightersDb.put({
                _id: item.object.name.toLowerCase(),
                data: item.object,
                merged: [item.object.constructor.name],
                fights: []
            });
        }
    }

    /**
     * @param {*} item 
     */
    async upsertFight(item) {
        let dbItem = null;
        try {
            dbItem = await this.fightsDb.get(item.object.id);
        } catch (e) {}
        if (!dbItem) {
            await this.fightsDb.put({
                _id: item.object.id,
                data: item.object,
                date: item.object.date
            });
        }
    }

    /**
     * @param {*} fName 
     * @param {*} fightId 
     */
    async addFightToFighter(fName, fightId) {
        let dbItem = null;
        try {
            dbItem = await this.fightersDb.get(fName.toLowerCase());
        } catch (e) {}
        if (dbItem) {
            dbItem.fights.push(fightId);
            await this.fightersDb.put(dbItem);
        }
    }

    /**
     * 
     * @param {FightEntity} fight 
     */
    async upsertDictionaryWinCatalog(fight) {
        let dbItem = null;
        if (!fight.winBy) {
            return;
        }
        try {
            dbItem = await this.dictionaries.get('WIN_CATALOG');
        } catch (e) {}
        if (!dbItem) {
            await this.dictionaries.put({
                _id: 'WIN_CATALOG',
                list: [fight.winBy]
            });
        } else if (!dbItem.list.includes(fight.winBy)) {
            dbItem.list.push(fight.winBy);
            await this.dictionaries.put(dbItem);
        }
    }

    /**
     * @param {FighterEntityL1} fighter 
     * @returns 
     */
    async upsertDictionaryWeightCategory(fighter) {
        let dbItem = null;
        if (!fighter.weightCategory) {
            return;
        }
        try {
            dbItem = await this.dictionaries.get('WEIGHT_CATEGORY');
        } catch (e) {}
        if (!dbItem) {
            await this.dictionaries.put({
                _id: 'WEIGHT_CATEGORY',
                list: [fighter.weightCategory]
            });
        } else if (!dbItem.list.includes(fighter.weightCategory)) {
            dbItem.list.push(fighter.weightCategory);
            await this.dictionaries.put(dbItem);
        }
    }
}
