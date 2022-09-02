const BUFFER_DIR = './data/buffer/'
const INDEX_FILE = BUFFER_DIR + '_index_fighters.json';

import fs from 'fs';
import FightersDataStructure from '../src/libs/FightersDataStructure.js';

if (!fs.existsSync(INDEX_FILE)) {
    throw new Error('Index file not found, run collect_data.js first');
}


console.log('---- STATISTIC ----');

if (process.argv.length === 2) {
    console.log('Execution parameters:');
    console.log('--ftr_count', "\tprint count of fighters");
    console.log('--search=Name', "\tsearch matches with fighter name and print data");
    process.exit(0);
}
const param = process.argv[2];
const indexData = JSON.parse(fs.readFileSync(INDEX_FILE));
if (param === '--ftr_count') {
    console.log('Fighters count:', Object.keys(indexData).length);
    console.log('Fighters with 2 data sources:', Object.values(indexData).reduce((total, cur) => {return total + (cur.sourcesCount > 1 ? 1 : 0);}, 0));
    console.log('Fighters with 100% profile fields filled:', Object.values(indexData).reduce((total, cur) => {return total + (cur.filledFieldsCount > 30 ? 1 : 0);}, 0));
    console.log('Fighters with 50% profile fields filled:', Object.values(indexData).reduce((total, cur) => {return total + (cur.filledFieldsCount > 15 ? 1 : 0);}, 0));
    console.log('Max filled fields count:', Object.values(indexData).reduce((total, cur) => {return cur.filledFieldsCount > total ? cur.filledFieldsCount : total;}, 0));
} else if (param.indexOf('-search') > 0) {
    const search = param.split('=')[1];
    console.log('Searching: ', search);

    function printFighterData (hash) {
        const obj = JSON.parse(fs.readFileSync(BUFFER_DIR + hash + '.json'));
        const fighter = new FightersDataStructure();
        fighter.map(obj);
        return fighter;
    }

    for(let hash in indexData) {
        if (indexData[hash].name.indexOf(search) >= 0) {
            console.log(hash, indexData[hash]);
            console.log(printFighterData(hash));
        }
    }
}