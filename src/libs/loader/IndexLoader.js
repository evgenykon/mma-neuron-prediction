const BUFFER_DIR = './data/buffer/'

import fs from 'fs';

export default class IndexLoader {

    constructor(file) {
        const path = BUFFER_DIR + '_index_' + file + '.json';
        if (fs.existsSync(path)) {
            this.json = JSON.parse(fs.readFileSync(path));
        } else {
            throw Error('Index not found');
        }
    }
    
    getJson() {
        return this.json;
    }

}