class FighterInFight {
    name;
    kd; // knockdowns
    ss; // sign. strikes
    ssPct; // sign.str.perc
    ts; // total strikes
    td; //takedowns
    tdPct;
    subAtt; // submiss attempts

    head;
    body;
    leg;
}


export default class FightsDataStructure {
    fighter1;
    fighter2;

    format;
    winner;
    winBy;
    lastRound;
    lastRoundTime;
    referree;
    date;
    location;

    constructor() {
        this.fighter1 = new FighterInFight();
        this.fighter2 = new FighterInFight();
    }
};