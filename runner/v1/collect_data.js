const META_SOURCE = './data/export/meta.json';

import Parser from '../src/libs/runner/Parser.js';
const parser = new Parser(META_SOURCE);
await parser.parseAll();
