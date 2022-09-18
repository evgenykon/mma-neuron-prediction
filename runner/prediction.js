import yargs from "yargs";
import { hideBin } from 'yargs/helpers'
import PredictionParser from './v2/PredictionParser.js';

yargs(hideBin(process.argv))
.usage('$0 <cmd> [args]')
.command('parse', 'Parse data according to data/export/meta.json', (yargs) => {}, function (argv) {
    (new PredictionParser()).parse();
})
.command('reset', 'Reset collected database', (yargs) => {}, function (argv) {
    console.log('reset');
})
.command('search [query]', 'Search and print collected info', (yargs) => {}, function (argv) {
    console.log('search')
})
.command('train [network]', 'Train one of network', (yargs) => {}, function (argv) {
    console.log('train')
})
.command('predict', 'Prediction according to data/prediction.json', (yargs) => {}, function (argv) {
    console.log('predict')
})
.version(false)
.help()
.argv
