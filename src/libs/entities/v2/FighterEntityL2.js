export default class FighterEntityL2 {
    name;
    tdDef;
    tdAccur;
    tdPerMin;
    ssDef;
    ssAccur;
    ssHitPerMin;
    ssLostPerMin;

    winsOfStrikers; // побед на ударниками
    winsOfWrestlers; // побед над борцами
    lossByStrikers; 
    lossByWrestlers;

    winsInHomeLoc; // побед дома
    winsInForeignLoc; 
    winsByKoToAllWinsPrc;
    winsBySubToAllWinsPrc;
    winsByDecToAllWinsPrc;
    winsToAllFightsPrc;
    winsAfterLoses;
    winsWithHighDamage;
    winsWithEqualRounds;
    winsDecSplit;

    lossByKoToAllWinsPrc;
    lossInHomeLoc; // проигрышей дома
    lossInForeignLoc;

    fiveRoundFights;
}