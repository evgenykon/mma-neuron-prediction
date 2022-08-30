import FightersDataStructure from "./FightersDataStructure.js";

export default class FighterBufferIndex {
    name;
    sourcesCount;
    filledFieldsCount;

    /**
     * @param {FightersDataStructure} fighter 
     */
    constructor(fighter, sourcesCount) {
        this.name = fighter.name;
        this.sourcesCount = sourcesCount;
        const keys = Object.keys(fighter);
        let filled = 0;
        for (let key of keys) {
            if (fighter[key]) {
                filled++;
            }
        }
        this.filledFieldsCount = filled;
    }
}