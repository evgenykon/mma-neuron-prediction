import synaptic from 'synaptic';
import BaseStyleResultDto from '../dto/BaseStyleResultDto.js';

const Neuron = synaptic.Neuron;

class BaseStyleParams {

    root;

    winsKo;
    winsSub;
    winsDec;
    lossKo;
    lossSub;
    lossDec;
    kd;
    td;
    tdDef;

    constructor() {
        this.root = new Neuron();

        this.winsKo = new Neuron();
        this.winsKo.project(this.root);
        this.winsSub = new Neuron();
        this.winsSub.project(this.root);
        this.winsDec = new Neuron();
        this.winsDec.project(this.root);
        this.lossKo = new Neuron();
        this.lossKo.project(this.root);
        this.lossSub = new Neuron();
        this.lossSub.project(this.root);
        this.lossDec = new Neuron();
        this.lossDec.project(this.root);
        this.kd = new Neuron();
        this.kd.project(this.root);
        this.td = new Neuron();
        this.td.project(this.root);
        this.tdDef = new Neuron();
        this.tdDef.project(this.root);
    }

    activateAll(winsKo, winsSub, winsDec,   lossKo, lossSub, lossDec,   kd, td, tdDef) {
        this.winsKo.activate(winsKo);
        this.winsSub.activate(winsSub);
        this.winsDec.activate(winsDec);
        this.lossKo.activate(lossKo);
        this.lossSub.activate(lossSub);
        this.lossDec.activate(lossDec);
        this.kd.activate(kd);
        this.td.activate(td);
        this.tdDef.activate(tdDef);
    }

    propagate(rate, value) {
        this.root.activate();
        this.root.propagate(rate, value);
    }

    activateByStat(stat) {
        this.winsKo.activate(stat.winsKo);
        this.winsSub.activate(stat.winsSub);
        this.winsDec.activate(stat.winsDec);
        this.lossKo.activate(stat.lossKo);
        this.lossSub.activate(stat.lossSub);
        this.lossDec.activate(stat.lossDec);
        this.kd.activate(stat.kd);
        this.td.activate(stat.td);
        this.tdDef.activate(stat.tdDef);
        return this.root.activate();
    }
}

export default class BaseStyleNetwork {

    bagStyle;
    striker;
    wrestler;
    grapler;
    ultimate;

    constructor() {
        this.bagStyle = new BaseStyleParams();
        this.striker = new BaseStyleParams();
        this.wrestler = new BaseStyleParams();
        this.grapler = new BaseStyleParams();
        this.ultimate = new BaseStyleParams();
    }

    train() {

        const neuronRate = .3;

        // bag style -- all params is low
        for(let i = 0; i < 20000; i++)
        {
            this.bagStyle.activateAll(0,0,0,0,0,0,0,0,0);
            this.bagStyle.propagate(neuronRate, 1);
            
            this.bagStyle.activateAll(1,1,1,1,1,1,1,1,1);
            this.bagStyle.propagate(neuronRate, 0); 
        }

        // striker -- exellent KO and KD rates, bad TD rates
        for(let i = 0; i < 20000; i++)
        {
            this.striker.activateAll(1,0,0.5, 0,1,0.5, 1,0,0); // good striker
            this.striker.propagate(neuronRate, 1);
            
            this.striker.activateAll(0,0,0.5, 1,0,0.5, 0,0,0); // bad striker
            this.striker.propagate(neuronRate, 0); 
        }

        // wrestler -- good sub and exellent td rates
        for(let i = 0; i < 20000; i++)
        {
            this.wrestler.activateAll(0,0.6,0.5, 0,0,0.5, 0,1,1); // good wrestler
            this.wrestler.propagate(neuronRate, 1);
            
            this.wrestler.activateAll(0,0,0.5, 0,0,0.5, 0,0,0); // bad wrestler
            this.wrestler.propagate(neuronRate, 0); 
        }

        // grapler -- exellent sub rate
        for(let i = 0; i < 20000; i++)
        {
            this.grapler.activateAll(0,1,0.5, 0,0,0.5, 0,1,1); // good grapler
            this.grapler.propagate(neuronRate, 1);
            
            this.grapler.activateAll(0,0,0.5, 0,1,0.5, 0,0.5,0.5); // bad grapler
            this.grapler.propagate(neuronRate, 0); 
        }
        
        // ultimate -- exellent sub rate
        for(let i = 0; i < 20000; i++)
        {
            this.ultimate.activateAll(1,1,1, 0,0,0, 1,1,1); // good ultimate
            this.ultimate.propagate(neuronRate, 1);
            
            this.ultimate.activateAll(0,0,0, 1,1,1, 0,0,0); // bad ultimate
            this.ultimate.propagate(neuronRate, 0); 
        }
    }

    /**
     * @param {*} fighterStat 
     * @returns {BaseStyleResultDto}
     */
    ask(fighterStat) {
        return new BaseStyleResultDto(
            this.bagStyle.activateByStat(fighterStat),
            this.striker.activateByStat(fighterStat),
            this.wrestler.activateByStat(fighterStat),
            this.grapler.activateByStat(fighterStat),
            this.ultimate.activateByStat(fighterStat)
        );
    }

}