import synaptic from 'synaptic'; // this line is not needed in the browser
const Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
	Architect = synaptic.Architect;

let F1 = {
	stk: new Neuron(),
	jju: new Neuron(),
	wrs: new Neuron(),
};


let F2 = {
	stk: new Neuron(),
	jju: new Neuron(),
	wrs: new Neuron(),
};


let F = {
	F1: new Neuron(),
	F2: new Neuron(),
};

let R = new Neuron();


F1.stk.project(F.F1);
F1.jju.project(F.F1);
F1.wrs.project(F.F1);

F2.stk.project(F.F2);
F2.jju.project(F.F2);
F2.wrs.project(F.F2);

F.F1.project(R);
F.F2.project(R);

var learningRate = .3;

for(var i = 0; i < 20000; i++)
{
	F1.stk.activate(0);
	F1.jju.activate(0);
	F1.wrs.activate(0);
	F.F1.activate();
	F.F1.propagate(learningRate, 0);

	F2.stk.activate(0);
	F2.jju.activate(0);
	F2.wrs.activate(0);
	F.F2.activate();
	F.F2.propagate(learningRate, 0);

	F1.stk.activate(1);
	F1.jju.activate(1);
	F1.wrs.activate(1);
	F.F1.activate();
	F.F1.propagate(learningRate, 1);

	F2.stk.activate(1);
	F2.jju.activate(1);
	F2.wrs.activate(1);
	F.F2.activate();
	F.F2.propagate(learningRate, 1);

	F.F1.activate(1);
	F.F2.activate(0);
	R.activate();
	R.propagate(learningRate, 0);

	F.F1.activate(0);
	F.F2.activate(1);
	R.activate();
	R.propagate(learningRate, 1);
}

// test it
F1.stk.activate(0);
F1.jju.activate(0);
F1.wrs.activate(0);

F2.stk.activate(1);
F2.jju.activate(1);
F2.wrs.activate(1);


console.log(F.F1.activate());
console.log(F.F2.activate());
console.log(R.activate());