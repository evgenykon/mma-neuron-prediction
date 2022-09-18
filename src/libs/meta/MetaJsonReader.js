import fs from 'fs';
import MetaFormatEnum from './enum/MetaFormatEnum.js';

export default class MetaJsonReader {
    format;

    constructor() {
        this.format = MetaFormatEnum.JSON;
    }

    readToBuffer(item) {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile(item.path, 'utf-8', (error,data) => {
                    if(error){
                        return reject(error);
                    }
                    console.log('MetaJsonReader file loaded:', item.path);
                    resolve(JSON.parse(data));
                });
            } catch (e) {
                reject(e);
            }
        });
    }
}