import yargs from "yargs";
import { hideBin } from 'yargs/helpers'
import DbReset from "./v2/DbReset.js";
import DbSearch from "./v2/DbSearch.js";
import PredictionParser from './v2/PredictionParser.js';

yargs(hideBin(process.argv))
.usage('$0 <cmd> [args]')
.command('parse', 'Parse data according to data/export/meta.json', (yargs) => {}, async function (argv) {
    const parser = new PredictionParser();
    //await parser.parse();
    await parser.fillEmptyData();    
})
.command('reset', 'Reset collected database', (yargs) => {}, function (argv) {
    (new DbReset()).run();
})
.command('search [query]', 'Search and print collected info', (yargs) => {}, function (argv) {
    (new DbSearch()).run(argv.query);
})
.command('train [network]', 'Train one of network', (yargs) => {}, function (argv) {
    console.log('train', argv.network)
})
.command('predict', 'Prediction according to data/prediction.json', (yargs) => {}, function (argv) {
    console.log('predict')
})
.version(false)
.help()
.argv
