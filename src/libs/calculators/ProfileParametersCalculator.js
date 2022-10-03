export default class ProfileParameterCalculator {
    profile;

    constructor(profile) {
        this.profile = profile;
    }

    /**
     * @returns float
     */
    getStrikingForce() {
        const totalWins = (this.profile.winsKo ?? 0) + (this.profile.winsSub ?? 0) + (this.profile.winsDecTotal ?? 0);
        if (!totalWins) {
            return null;
        }
        if (!this.profile.winsKo) {
            return 0;
        }
        return this.profile.winsKo / totalWins;
    }

    /**
     * @returns float
     */
    getSubmissionSkill() {
        const totalWins = (this.profile.winsKo ?? 0) + (this.profile.winsSub ?? 0) + (this.profile.winsDecTotal ?? 0);
        if (!totalWins) {
            return null;
        }
        if (!this.profile.winsSub) {
            return 0;
        }
        return this.profile.winsSub / totalWins;
    }

    getFightsStat(fights) {
        let stat = {
            totalFights: 0,
            kd: 0,
            sStr: 0,
            tStr: 0,
            td: 0,
            subAtt: 0,
            wins: 0,
            winKo: 0,
            winSub: 0,
            winDec: 0,
            loss: 0,
            lossKo: 0,
            lossSub: 0,
            lossDec: 0,
            maxRound: 0
        };
        for (let fight of fights.docs) {
            console.log('fight', fight);
            stat.totalFights++;
            if (fight.f1Name === this.profile.name) {
                stat.kd += fight.f1KD;
                stat.sStr += fight.f1SStr;
                stat.tStr += fight.f1TotalStr;
                stat.td += fight.f1Td;
                stat.subAtt += fight.f1SubAtt;
            } else if (fight.f2Name === this.profile.name) {
                stat.kd += fight.f2KD;
                stat.sStr += fight.f2SStr;
                stat.tStr += fight.f2TotalStr;
                stat.td += fight.f2Td;
                stat.subAtt += fight.f2SubAtt;
            }
            stat.wins += (fight.winnerName === this.profile.name) ? 1 : 0;
            stat.winKo += (fight.winnerName === this.profile.name && (fight.winBy === 'KO' || fight.winBy === 'Knockout')) ? 1 : 0; // @todo distinct all possible winBy values
        }
    }
}
