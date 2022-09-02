import {NeuralNetwork} from 'brain.js';


const net = new NeuralNetwork({ hiddenLayers: [3] });

const trainingData = [
{ input: [0, 0], output: [0] },
{ input: [0, 1], output: [1] },
{ input: [1, 0], output: [1] },
{ input: [1, 1], output: [0] }
];

net.train(trainingData);

console.log(net.run([0, 0]));

/**
 * $ node brain-js.js 
node:internal/modules/cjs/loader:933
  const err = new Error(message);
              ^

Error: Cannot find module 'gpu.js'
Require stack:
- E:\Programming\github.mma-predictions\node_modules\brain.js\dist\index.js
←[90m    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:933:15)←[39m
←[90m    at Function.Module._load (node:internal/modules/cjs/loader:778:27)←[39m
←[90m    at Module.require (node:internal/modules/cjs/loader:1005:19)←[39m
←[90m    at require (node:internal/modules/cjs/helpers:102:18)←[39m
    at Object.<anonymous> (E:\Programming\github.mma-predictions\node_modules\←[4mbrain.js←[24m\dist\index.js:5:14)
←[90m    at Module._compile (node:internal/modules/cjs/loader:1103:14)←[39m
←[90m    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1157:10)←[39m
←[90m    at Module.load (node:internal/modules/cjs/loader:981:32)←[39m
←[90m    at Function.Module._load (node:internal/modules/cjs/loader:822:12)←[39m
←[90m    at ModuleWrap.<anonymous> (node:internal/modules/esm/translators:168:29)←[39m {
  code: ←[32m'MODULE_NOT_FOUND'←[39m,
  requireStack: [
    ←[32m'E:\\Programming\\github.mma-predictions\\node_modules\\brain.js\\dist\\index.js'←[39m
  ]
}
 */