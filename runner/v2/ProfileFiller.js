import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
import FighterEntityL1 from '../../src/libs/entities/v2/FighterEntityL1';
import FighterEntityL2 from '../../src/libs/entities/v2/FighterEntityL2';
import FighterEntityL3 from '../../src/libs/entities/v2/FighterEntityL3';
PouchDB.plugin(find);
import ProfileParameterCalculator from '../../src/libs/calculators/ProfileParametersCalculator';

export default class ProfileFiller {

    /**
     * @param {*} fighterProfile 
     */
    constructor(fighterProfile) {
        this.fighterProfile = fighterProfile;
    }

    async fill() {
        const fightersDb = new PouchDB('data/db/fighters');
        const fightsDb = new PouchDB('data/db/fights');
        const fights = await fightsDb.find({
            selector: {
                _id: {$in: this.fighterProfile.fights}
            }
        });

        let fe1 = new FighterEntityL1();
        let fe2 = new FighterEntityL2();
        let fe3 = new FighterEntityL3();
        
        const calculator = new ProfileParameterCalculator(this.fighterProfile);

        fe3.strikingForce = calculator.getStrikingForce(this.fighterProfile);
        fe3.submissionSkill = calculator.getSubmissionSkill(this.fighterProfile);

        fightsStat = calculator.getFightsStat(fights.docs.map(item => item.data));

        for (let fight of fights.docs) {
            console.log('fight', fight);

            // @todo get L1.baseStyle
            // @todo get L1.winsKo (if null)
            // @todo get L1.winsSub (if null)
            // @todo get L1.winsDecTotal (if null)
            // @todo get L1.winsDecSplit (if null)
            // @todo get L1.lossSub (if null)
            // @todo get L1.lossKo (if null)
            // @todo get L1.lossDecTotal (if null)
            // @todo get L1.lossDecSplit (if null)
            // @todo get L2.winsOfStrikers
            // @todo get L2.winsOfWrestlers
            // @todo get L2.lossByStrikers
            // @todo get L2.lossByWrestlers
            // @todo get L2.winsInHomeLoc
            // @todo get L2.winsInForeignLoc
            // @todo get L2.winsByKoToAllWinsPrc
            // @todo get L2.winsBySubToAllWinsPrc
            // @todo get L2.winsByDecToAllWinsPrc
            // @todo get L2.winsToAllFightsPrc
            // @todo get L2.winsAfterLoses
            // @todo get L2.winsWithHighDamage
            // @todo get L2.lossByKoToAllWinsPrc
            // @todo get L2.lossInHomeLoc
            // @todo get L2.lossInForeignLoc
            // @todo get L2.fiveRoundFights
        }
        throw Error('sss');
    }
}