export default class BaseStyleResultDto {
    constructor(bag, striker, wrestler, grapler, ultimate) {
        this.bag = bag;
        this.striker = striker;
        this.wrestler = wrestler;
        this.grapler = grapler;
        this.ultimate = ultimate;
    }

    getStyleName() {
        let maxValue = 0;
        let name = null;
        for (let p of ['bag','striker','wrestler','grapler','ultimate']) {
            if (this[p] > maxValue) {
                maxValue = this[p];
                name = p;
            }
        }
        return name ? name : undefined;
    }
}