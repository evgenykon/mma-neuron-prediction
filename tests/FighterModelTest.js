import synaptic from 'synaptic';
import FighterModel from '../src/libs/networks/FigherModel.js';
import FightModel from '../src/libs/networks/FightModel.js';

const Neuron = synaptic.Neuron;

let fight = new FightModel();
fight.fighter1 = new Neuron();
fight.fighter2 = new Neuron();

let fighterFields = [
    'weight',
    'height',
    'reach',
    'endurance',
    'strikingForce',
    'strikingSkill',
    'strikingAccuracy',
    'strikingStamina',
    'distanceControl',
    'movingSkill',
    'clinchSkill',
    'reactionSpeed',
    'takedownDefence',
    'takeDownSkill',
    'wrestling',
    'submissionSkill',
    'mentalStamina',
    'preparingQuality',
    'ownLocation'
];

let fighter1 = new FighterModel();
let fighter2 = new FighterModel();
for (let f of fighterFields) {
    fighter1[f] = new Neuron();
    fighter1[f].project(fight.fighter1);
    fighter2[f] = new Neuron();
    fighter2[f].project(fight.fighter2);
}

let result = new Neuron();
fight.fighter1.project(result);
fight.fighter2.project(result);

var neuronRate = .3;

for(var i = 0; i < 20000; i++)
{
    // lowest values ..
    for (let f of fighterFields) {
        fighter1[f].activate(0.5);
        fighter2[f].activate(0.5);
    }
    fight.fighter1.activate();
    fight.fighter2.activate();
    // .. is zero for fighter
    fight.fighter1.propagate(neuronRate, 0); 
    fight.fighter2.propagate(neuronRate, 0);

    // highest values ..
    for (let f of fighterFields) {
        fighter1[f].activate(1);
        fighter2[f].activate(1);
    }
    fight.fighter1.activate();
    fight.fighter2.activate();
    // .. is one
    fight.fighter1.propagate(neuronRate, 1);
    fight.fighter2.propagate(neuronRate, 1);

    // first fighter win (eq 0)
    fight.fighter1.activate(1);
    fight.fighter2.activate(0.8);
    result.activate();
    result.propagate(neuronRate, 0);

    // second fighter win (eq 1)
    fight.fighter1.activate(0.8);
    fight.fighter2.activate(1);
    result.activate();
    result.propagate(neuronRate, 1);

    // no one win (eq 0.5)
    fight.fighter1.activate(0);
    fight.fighter2.activate(0);
    result.activate();
    result.propagate(neuronRate, 0.5);

    // both win (eq 0.5)
    fight.fighter1.activate(1);
    fight.fighter2.activate(1);
    result.activate();
    result.propagate(neuronRate, 0.5);
}


// Khabib
/*{
  age: [ 32 ],
  height: [ 5.833 ],
  reach: [ 70 ],
  wins: [ 29 ],
  losses: [ 29 ],
  winsKo: [ 8 ],
  winsDec: [ 10 ],
  winsSub: [ 11 ],
  lossKo: [ NaN ],
  lossDec: [ NaN ],
  tdDef: [ 84 ],
  tdAccur: [ 48 ],
  tdPerMin: [ 5.32 ],
  ssDef: [ 65 ],
  ssAccur: [ 48 ],
  ssHitPerMin: [ 4.1 ],
  ssLostPerMin: [ 1.75 ]
}*/
const f1 = new FighterModel();
f1.height = 0.8;
f1.weight = 0.8;
f1.reach = 0.5;
f1.endurance = 1;
f1.strikingForce = 0.6;
f1.strikingSkill = 0.4;
f1.strikingAccuracy = 0.4;
f1.strikingStamina = 0.8;
f1.distanceControl = 0.8;
f1.movingSkill = 0.8;
f1.clinchSkill = 0.9;
f1.reactionSpeed = 0.8;
f1.takedownDefence = 1;
f1.takeDownSkill = 1;
f1.wrestling = 1;
f1.submissionSkill = 0.9;
f1.preparingQuality = 0.8;
f1.ownLocation = 0.4;
f1.mentalStamina = 0.7;


// Conor
/*{
  age: [ 33 ],
  height: [ 5.75 ],
  reach: [ 74 ],
  wins: [ 22 ],
  losses: [ 5 ],
  winsKo: [ 19 ],
  winsDec: [ 2 ],
  winsSub: [ 1 ],
  lossKo: [ 2 ],
  lossDec: [ NaN ],
  tdDef: [ 67 ],
  tdAccur: [ 55 ],
  tdPerMin: [ 0.7 ],
  ssDef: [ 54 ],
  ssAccur: [ 49 ],
  ssHitPerMin: [ 5.32 ],
  ssLostPerMin: [ 4.54 ]
}*/
const f2 = new FighterModel();
f2.height = 0.75;
f2.weight = 0.7;
f2.reach = 0.7;
f2.endurance = 0.6;
f2.strikingForce = 1;
f2.strikingSkill = 1;
f2.strikingAccuracy = 1;
f2.strikingStamina = 0.8;
f2.distanceControl = 0.8;
f2.movingSkill = 0.8;
f2.clinchSkill = 0.7;
f2.reactionSpeed = 0.8;
f2.takedownDefence = 0.7;
f2.takeDownSkill = 0.5;
f2.wrestling = 0.5;
f2.submissionSkill = 0.5;
f2.preparingQuality = 0.8;
f2.ownLocation = 0.7;
f1.mentalStamina = 0.6;

for (let f of fighterFields) {
    fighter1[f].activate(f1[f]);
    fighter2[f].activate(f2[f]);
}

console.log(fight.fighter1.activate());
console.log(fight.fighter2.activate());
console.log(result.activate());