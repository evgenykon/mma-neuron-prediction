const BUFFER_DIR = './data/buffer/';

import FighterLoader, {FighterValuableColumns} from '../src/libs/loader/FighterLoader.js';
import IndexLoader from '../src/libs/loader/IndexLoader.js';
import * as dfd from "danfojs-node"

const fighters = new IndexLoader('fighters').getJson();

let dataset = [];

for (let fighter of Object.values(fighters)) {
    const fighterLoader = (new FighterLoader(fighter.name));
    dataset.push(fighterLoader.getFighterNumbers());
}

let df = new dfd.DataFrame(dataset, { columns: FighterValuableColumns })
let df_drop = df.dropNa({ axis: 1 })

let scaler = new dfd.MinMaxScaler()
scaler.fit(df_drop)
let df_enc = scaler.transform(df_drop)
df_enc.print();

dfd.toJSON(df_enc, {
    format: "row",
    filePath: BUFFER_DIR + '_embedded_data.json'
});

console.log('Normalized values stored')