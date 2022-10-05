import BaseStyleNetwork from "./BaseStyleNetwork.js";

export default class Brain {
    baseStyleNetwork;

    constructor() {
        this.baseStyleNetwork = new BaseStyleNetwork();
        this.baseStyleNetwork.train();
    }
}