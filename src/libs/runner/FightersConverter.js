const BUFFER_DIR = './data/buffer/'



import fs from 'fs';
import md5 from 'js-md5';
import FighterBufferIndex from "../FighterBufferIndex.js";
import FightersDataStructure from "../FightersDataStructure.js";
import FightsDataStructure from '../FightsDataStructure.js';

export default class FightersConverter {

    index;

    constructor() {
        this.index = {};
    }

    /**
     * @param {*} data 
     * @param {*} meta 
     */
    async processFightersData(data, meta) {
        if (!Array.isArray(data)) {
            throw new Error('Incorrect format');
        }
        for (let row of data) {
            let fighter = new FightersDataStructure();
            for (let m of meta.structure) {
                for (let field of Object.keys(fighter)) {
                    if (typeof m[field] === 'undefined') {
                        continue;
                    }
                    fighter[field] = row[m[field]];
                }
            }
            fighter.clearTypes();
            await this._processFigher(fighter);
        }
    }

    /**
     * @param {*} data 
     * @param {*} meta 
     */
    async processFightsData(data, meta) {
        if (!Array.isArray(data)) {
            throw new Error('Incorrect format');
        }
        for (let row of data) {
            let fight = new FightsDataStructure();
            for (let m of meta.structure) {
                for (let field of Object.keys(fight)) {
                    if (typeof m[field] === 'undefined') {
                        continue;
                    }
                    fight[field] = row[m[field]];
                }
                for (let field of Object.keys(fight.fighter1)) {
                    if (typeof m['f1_' + field] !== 'undefined') {
                        fight.fighter1[field] = row[m['f1_' + field]];
                    }
                    if (typeof m['f2_' + field] !== 'undefined') {
                        fight.fighter2[field] = row[m['f2_' + field]];
                    }
                }
            }
            await this._processFight(fight);
        }
    }


    /**
     * @param {FightersDataStructure} fighter 
     */
    async _processFigher(fighter) {
        const fname = md5(fighter.name);
        const filePath = this._getFighterPath(fname);
        const data = new FightersDataStructure();
        let srcCount = 1;
        if (fs.existsSync(filePath)) {
            data.map(JSON.parse(fs.readFileSync(filePath)));
            srcCount++;
        }
        data.merge(fighter);
        this.index[fname] = new FighterBufferIndex(fighter, srcCount);
        fs.writeFileSync(filePath, JSON.stringify(data));
    }

    /**
     * @param {*} fight 
     */
    async _processFight(fight) {
        const f1name = md5(fight.fighter1.name);
        const f2name = md5(fight.fighter2.name);
        const filePath = this._getFightPath(f1name, f2name);
        const f1Path = this._getFighterPath(f1name);
        const f2Path = this._getFighterPath(f2name);
        if (!fs.existsSync(f1Path) || !fs.existsSync(f2Path)) {
            return;
        }
        fs.writeFileSync(filePath, JSON.stringify(fight));
        const fighter1 = new FightersDataStructure();
        fighter1.map(JSON.parse(fs.readFileSync(f1Path)));
        fighter1.addFight(fight);
        fs.writeFileSync(f1Path, JSON.stringify(fighter1));
        const fighter2 = new FightersDataStructure();
        fighter2.map(JSON.parse(fs.readFileSync(f2Path)));
        fighter2.addFight(fight);
        fs.writeFileSync(f2Path, JSON.stringify(fighter2));
    }

    /**
     * 
     */
    storeBufferIndex() {
        fs.writeFileSync(BUFFER_DIR + 'index.json', JSON.stringify(this.index));
    }

    /**
     * 
     * @param {*} fname 
     * @returns 
     */
    _getFighterPath(fname) {
        return BUFFER_DIR + fname + '.json';
    }

    _getFightPath(f1name, f2name) {
        return BUFFER_DIR + 'fight_' + f1name + '_' + f2name + '.json';
    }

};