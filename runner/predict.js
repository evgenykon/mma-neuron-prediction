const BUFFER_DIR = './data/buffer/';
import synaptic from 'synaptic';
import FighterLoader, {FighterValuableColumns} from '../src/libs/loader/FighterLoader.js';
import * as dfd from "danfojs-node";
import fs from 'fs';
import IndexLoader from '../src/libs/loader/IndexLoader.js';

const Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
	Architect = synaptic.Architect;

if (process.argv.length !== 4) {
    console.log('Execution:');
    console.log('predict.js "Ciryl Gane" "Tai Tuivasa"');
    process.exit(0);
}

const f1name = process.argv[2];
const f2name = process.argv[3];

const pf1 = new dfd.DataFrame((new FighterLoader(f1name)).getFighterFrame());
const pf2 = new dfd.DataFrame((new FighterLoader(f2name)).getFighterFrame());
const pinputDfA = dfd.concat({ dfList: [pf1, pf2], axis: 1 }).dropNa({ axis: 1 });
if (pinputDfA.values.length === 0) {
    console.error('One of fighter has incorrect data', f1, f2);
    process.exit(0);
}
const pinputDfB = dfd.concat({ dfList: [pf2, pf1], axis: 1 });

const json = JSON.parse(fs.readFileSync(BUFFER_DIR + 'network.json'));
const network = Network.fromJSON(json);

const pred1 = network.activate(pinputDfA.values[0]);
const pred2 = network.activate(pinputDfB.values[0]);

let preds = [pred1[0], pred2[0]];
Array.prototype.max = function() {
    return Math.max.apply(null, this);
};
 
if (preds.max() < 0.5) {
    console.log('Unrecognized prediction values');
}
console.log('F1-F2; F2-F1', preds);