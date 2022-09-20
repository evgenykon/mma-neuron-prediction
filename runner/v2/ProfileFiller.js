import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
PouchDB.plugin(find);

export default class ProfileFiller {
    constructor(dbDoc) {
        this.dbDoc = dbDoc;
    }

    async fill() {
        const fightersDb = new PouchDB('data/db/fighters');
        const fightsDb = new PouchDB('data/db/fights');
        const fights = await fightsDb.find({
            selector: {
                _id: {$in: this.dbDoc.fights}
            }
        });
        for (let fight of fights.docs) {
            console.log(fight);
            // @todo get L1.baseStyle
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