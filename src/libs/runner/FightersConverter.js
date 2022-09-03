const BUFFER_DIR = './data/buffer/'

import fs from 'fs';
import md5 from 'js-md5';
import FighterBufferIndex from "../entities/FighterBufferIndex.js";
import FightersDataStructure from "../entities/FightersDataStructure.js";
import FightsDataStructure from '../entities/FightsDataStructure.js';

export default class FightersConverter {

    // Indexes
    fighers;
    countries;
    teams;
    stances;
    fights;

    constructor() {
        this.fighers = {};
        this.countries = {};
        this.teams = {};
        this.stances = {};
        this.fights = {};
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
            await this._processCountry(fighter);
            await this._processTeam(fighter);
            await this._processStance(fighter);
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
        this.fighers[fname] = new FighterBufferIndex(fighter, srcCount);
        fs.writeFileSync(filePath, JSON.stringify(data));
    }

    async _processCountry(fighter) {
        if (!fighter.country) {
            return;
        }
        this.countries[md5(fighter.country)] = fighter.country;
    }

    async _processTeam(fighter) {
        if (!fighter.team) {
            return;
        }
        this.teams[md5(fighter.team)] = fighter.team;
    }

    async _processStance(fighter) {
        if (!fighter.stance) {
            return;
        }
        this.stances[md5(fighter.stance)] = fighter.stance;
    }

    /**
     * @param {*} fight 
     */
    async _processFight(fight) {
        const f1name = md5(fight.fighter1.name);
        const f2name = md5(fight.fighter2.name);
        this._storeFight(fight);
        const f1Path = this._getFighterPath(f1name);
        const f2Path = this._getFighterPath(f2name);
        if (!fs.existsSync(f1Path) || !fs.existsSync(f2Path)) {
            return;
        }
        const fighter1 = new FightersDataStructure();
        fighter1.map(JSON.parse(fs.readFileSync(f1Path)));
        fighter1.addFight(fight);
        fs.writeFileSync(f1Path, JSON.stringify(fighter1));
        const fighter2 = new FightersDataStructure();
        fighter2.map(JSON.parse(fs.readFileSync(f2Path)));
        fighter2.addFight(fight);
        fs.writeFileSync(f2Path, JSON.stringify(fighter2));
    }

    storeBufferIndexes() {
        fs.writeFileSync(BUFFER_DIR + '_index_fighters.json', JSON.stringify(this.fighers));
        fs.writeFileSync(BUFFER_DIR + '_index_countries.json', JSON.stringify(this.countries));
        fs.writeFileSync(BUFFER_DIR + '_index_teams.json', JSON.stringify(this.teams));
        fs.writeFileSync(BUFFER_DIR + '_index_stances.json', JSON.stringify(this.stances));
        fs.writeFileSync(BUFFER_DIR + '_index_fights.json', JSON.stringify(this.fights));
        console.log('Indexes stored');
    }

    /**
     * @param {*} fname 
     * @returns 
     */
    _getFighterPath(fname) {
        return BUFFER_DIR + fname + '.json';
    }

    /**
     * @returns 
     */
    _storeFight(fight) {
        const name = md5(fight.fighter1.name + fight.fighter2.name + fight.date);
        const path = BUFFER_DIR + 'fight_' + name + '.json';
        fs.writeFileSync(path, JSON.stringify(fight));
        this.fights[name] = fight;
    }

};