const BUFFER_DIR = './data/buffer/';
//const DATASET = BUFFER_DIR + '_embedded_data.json';

import synaptic from 'synaptic'; // this line is not needed in the browser
import FighterLoader, {FighterValuableColumns} from '../src/libs/loader/FighterLoader.js';
import IndexLoader from '../src/libs/loader/IndexLoader.js';
import * as dfd from "danfojs-node";
import fs from 'fs';

const Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
	Architect = synaptic.Architect;


const inputLayer = new Layer(FighterValuableColumns.length * 2);
const hiddenLayer = new Layer(FighterValuableColumns.length);
const outputLayer = new Layer(1);
const learningRate = .3;

inputLayer.project(hiddenLayer, Layer.connectionType.ALL_TO_ALL);
hiddenLayer.project(outputLayer, Layer.connectionType.ALL_TO_ALL);

const theNetwork = new Network({
	input: inputLayer,
	hidden: [hiddenLayer],
	output: outputLayer
});

const fightIndex = (new IndexLoader('fights')).getJson();

// Training
let fightsCount = 0;
for (let fi of Object.values(fightIndex)) {
    try {
        const fl1 = (new FighterLoader(fi.fighter1.name)).getFighterFrame();
        const fl2 = (new FighterLoader(fi.fighter2.name)).getFighterFrame();
        const f1 = new dfd.DataFrame(fl1);
        const f2 = new dfd.DataFrame(fl2);
        const inputDf = dfd.concat({ dfList: [f1, f2], axis: 1 }).dropNa({ axis: 1 });
        if (inputDf.values.length === 0) {
            console.error('Skip fight couse one of fighter has incorrect data');
            continue;
        }
        const winner = (fi.winner === fi.fighter1.name ? 0 : (fi.winner === fi.fighter2.name ? 1 : null));
        if (winner === null) {
            console.error('Skip fight couse fight has no winer');
            continue;
        }
        for (let i=0; i<1000; i++) {
            theNetwork.activate(inputDf.values[0]);
            theNetwork.propagate(learningRate, [winner]);
        }
        fightsCount++;
    } catch (e) {
        console.error('Skip fight couse error loading one of fighter', e);
        continue;
    }
    
}

console.log('Fights processed:', fightsCount);

const standalone = theNetwork.standalone();
fs.writeFileSync(BUFFER_DIR + 'network.js', standalone.toString());
fs.writeFileSync(BUFFER_DIR + 'network.json', JSON.stringify(theNetwork.toJSON()));

console.log('Network stored');