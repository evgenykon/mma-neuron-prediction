/**
- Name
- Age 
- Height 
- Reach 
- Country
- Team
- Wins 
- Losses 
- Wins by KO+TKO
- Wins by decision
- Wins by submission
- Lossess by KO+TKO
- Lossess by submissions
- Lossess by decision
- Takedown defence
- Takedown accuracy
- Takedown avg per minute
- Sign.strikes defence
- Sign.strikes accuracy
- Sign.strikes hit per minute
- Sign.strikes losted per minute

 */
export default class FightersDataStructure {
    name;
    age;
    height;
    reach;
    country;
    team;
    wins;
    losses;
    winsKo;
    winsDec;
    winsSub;
    winsSplit;
    lossKo;
    lossDec;
    lossSub;
    lossSplit;
    tdDef;
    tdAccur;
    tdPerMin;
    ssDef;
    ssAccur;
    ssHitPerMin;
    ssLostPerMin;
    normalWeight;
    lastFightWinRatio;
    lastFightWins;
    lastFightWeight;
    careerAge;
    maxRoundNumber;
    totalRoundInCareer;
    titleWins;
    titleAttempts;
    stance;

    fightsList;

    constructor() {
        this.fightsList = [];
    }

    map(data) {
        Object.assign(this, data);
    }

    merge(data) {
        for (let key of Object.keys(data)) {
            if (data[key]) {
                this[key] = data[key];
            }
        }
    }

    clearTypes() {
        this.age = this.age ? parseInt(this.age) : undefined;
        this.wins = this.wins ? parseInt(this.wins) : undefined;
        this.losses = this.losses ? parseInt(this.losses) : undefined;
        this.winsKo = this.winsKo ? parseInt(this.winsKo) : undefined;
        this.winsDec = this.winsDec ? parseInt(this.winsDec) : undefined;
        this.winsSub = this.winsSub ? parseInt(this.winsSub) : undefined;
        this.lossKo = this.lossKo ? parseInt(this.lossKo) : undefined;
        this.lossDec = this.lossDec ? parseInt(this.lossDec) : undefined;
        this.lossSub = this.lossSub ? parseInt(this.lossSub) : undefined;
    }

    addFight(fight) {
        this.fightsList.push(fight);
    }

}