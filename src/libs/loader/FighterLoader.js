const BUFFER_DIR = './data/buffer/'

import fs from 'fs';
import md5 from 'js-md5';
import FightersDataStructure from '../entities/FightersDataStructure.js';

const FighterValuableColumns = [
    'age',
    'height',
    'reach',
    'wins',
    'losses',
    'winsKo',
    'winsDec',
    'winsSub',
    'lossKo',
    'lossDec',
    'tdDef',
    'tdAccur',
    'tdPerMin',
    'ssDef',
    'ssAccur',
    'ssHitPerMin',
    'ssLostPerMin'
];

export default class FighterLoader {

    constructor(name) {
        const fname = md5(name);
        const filePath = this._getFighterPath(fname);
        if (fs.existsSync(filePath)) {
            this.json = JSON.parse(fs.readFileSync(filePath));
        } else {
            throw Error('Fighter not found');
        }
    }

    /**
     * @param {*} fname 
     * @returns 
     */
    _getFighterPath(fname) {
        return BUFFER_DIR + fname + '.json';
    }
    
    getJson() {
        return this.json;
    }

    getFighter() {
        const f = new FightersDataStructure();
        f.map(this.json);
        return f;
    }

    getFieldNumbericValue(field) {
        const fighter = this.getFighter();
        return parseFloat(fighter[field]);
    }

    getFighterRowset() {
        let data = {};
        for (let column of FighterValuableColumns) {
            data[column] = this.getFieldNumbericValue(column);
        }
        return data;
    }

    getFighterNumbers() {
        let data = [];
        for (let column of FighterValuableColumns) {
            data.push(this.getFieldNumbericValue(column));
        }
        return data;
    }

    getFighterFrame() {
        let data = {};
        for (let column of FighterValuableColumns) {
            data[column] = [this.getFieldNumbericValue(column)];
        }
        return data;
    }
}

export {FighterValuableColumns};