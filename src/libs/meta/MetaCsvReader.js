import fs from 'fs';
import csv from 'csv-parser';
import BaseMetaReader from './BaseMetaReader.js';
import MetaFormatEnum from './enum/MetaFormatEnum.js';

export default class MetaCsvReader extends BaseMetaReader {
    format;

    constructor() {
        super();
        this.format = MetaFormatEnum.CSV;
    }

    readToBuffer(item) {
        return new Promise((resolve, reject) => {
            let buffer = [];
            try {
                fs.createReadStream(item.path).pipe(csv({
                    separator: item.separator,
                    mapHeaders: ({ header, index }) => header.replace(/\./g, '')
                }))
                .on('data', (row) => {
                    buffer.push(row);
                })
                .on('end', () => {
                    console.log('MetaCsvReader file loaded:', item.path);
                    resolve(buffer);
                });
            } catch (e) {
                reject(e);
            }
        });
    }
}