const SOURCE_FILES = {
    FIGHTERS_1: './data/export/csv/kaggle.com_pro_mma_fighters.csv',
    FIGHTERS_2: './data/export/json/ufcstats.com_fighters.json',
    FIGHTS_1: './data/export/csv/'
};

import fs from 'fs';
import csv from 'csv-parser';
import FightersConverter from './FightersConverter.js';

export default class Parser {
    constructor(sourceMetaPath) {
        this.meta = JSON.parse(fs.readFileSync(sourceMetaPath));
    }

    async parseAll() {
        const converter = new FightersConverter();
        for (let item of this.meta) {
            if (!['FIGHTERS', 'FIGHTS'].includes(item.type)) {
                throw Error('Unknown format META');
            }
            const buffer = await this.parseFileByMeta(item);
            if (item.type === 'FIGHTERS') {
                await converter.processFightersData(buffer, item);

            } else if (item.type === 'FIGHTS') {
                await converter.processFightsData(buffer, item);
            }
        }
        converter.storeBufferIndex();
    }

    /**
     * @param {*} item 
     * @returns 
     */
    parseFileByMeta(item) {
        return new Promise((resolve, reject) => {
            if (item.format === 'CSV') {
                let buffer = [];
                fs.createReadStream(item.path).pipe(csv({
                    separator: item.separator,
                    mapHeaders: ({ header, index }) => header.replace(/\./g, '')
                }))
                .on('data', (row) => {
                    buffer.push(row);
                })
                .on('end', () => {
                    console.log('CSV file successfully parsed:', item.path);
                    resolve(buffer);
                });

            } else if (item.format === 'JSON') {
                fs.readFile(item.path, 'utf-8', (error,data) => {
                    if(error){
                        return reject(error);
                    }
                    console.log('JSON file successfully parsed:', item.path);
                    resolve(JSON.parse(data));
                });

            } else {
                throw Error('Unknown format FIGHTERS');
            }
        });
    }
};