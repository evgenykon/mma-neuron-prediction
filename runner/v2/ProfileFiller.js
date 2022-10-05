import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
import FighterEntityL1 from '../../src/libs/entities/v2/FighterEntityL1.js';
import FighterEntityL2 from '../../src/libs/entities/v2/FighterEntityL2.js';
import FighterEntityL3 from '../../src/libs/entities/v2/FighterEntityL3.js';
PouchDB.plugin(find);
import ProfileParameterCalculator from '../../src/libs/calculators/ProfileParametersCalculator.js';

export default class ProfileFiller {

    /**
     * @param {*} fighterProfile 
     * @param {FightDictionaries} dictionaries 
     * @param {Brain} brain
     */
    constructor(fighterProfile, dictionaries, brain) {
        this.fighterProfile = fighterProfile;
        this.fightersDb = new PouchDB('data/db/fighters');
        this.fightsDb = new PouchDB('data/db/fights');
        this.dictionaries = dictionaries;
        this.brain = brain;
    }

    async fill() {
        const fights = await this.fightsDb.find({
            selector: {
                _id: {$in: this.fighterProfile.fights}
            }
        });

        let fe1 = new FighterEntityL1();
        let fe2 = new FighterEntityL2();
        let fe3 = new FighterEntityL3();
        
        const calculator = new ProfileParameterCalculator(this.fighterProfile, this.brain);
        
        const fightsStat = calculator.getFightsStat(fights.docs.map(item => item.data));

        fe1.baseStyle = calculator.getBaseStyleFromFightStat(fightsStat);
        fe3.strikingForce = calculator.getStrikingForce(this.fighterProfile);
        fe3.submissionSkill = calculator.getSubmissionSkill(this.fighterProfile);
    
        this.fighterProfile.data = {
            // @todo ignore undefined
            ...this.fighterProfile.data,
            ...fe1,
            ...fe2,
            ...fe3
        };

        console.log(this.fighterProfile);


        // for (let fight of fights.docs) {
        //     console.log('fight', fight);

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
        // }
         throw Error('sss');
    }

    getUniqueWinNames(fights) {
        return fights.map(item => item.winBy);
    }
}