
export default class ProfileParameterCalculator {
    profile;
    brain;

    constructor(profile, brain) {
        this.profile = profile;
        this.brain = brain;
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

    /**
     * @param {*} fights 
     * @returns 
     */
    getFightsStat(fights) {
        let stat = {
            totalFights: 0, // 
            kd: 0, //
            sStr: 0, //
            tStr: 0, //
            td: 0, //
            subAtt: 0, //
            wins: 0, //
            winKo: 0, //
            winSub: 0, //
            winDec: 0,// 
            loss: 0,//
            lossKo: 0,//
            lossSub: 0,//
            lossDec: 0, //
            maxRound: 0 //
        };
        for (let fight of fights) {
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
            stat.winKo += (fight.winnerName === this.profile.name && fight.winBy.indexOf('TKO')>-1) ? 1 : 0;
            stat.winSub += (fight.winnerName === this.profile.name && fight.winBy.indexOf('Submission')>-1) ? 1 : 0;
            stat.winDec += (fight.winnerName === this.profile.name && fight.winBy.indexOf('Decision')>-1) ? 1 : 0;
            stat.loss += (fight.winnerName !== this.profile.name) ? 1 : 0;
            stat.lossKo += (fight.winnerName !== this.profile.name && fight.winBy.indexOf('TKO')>-1) ? 1 : 0;
            stat.lossSub += (fight.winnerName !== this.profile.name && fight.winBy.indexOf('Submission')>-1) ? 1 : 0;
            stat.lossDec += (fight.winnerName !== this.profile.name && fight.winBy.indexOf('Decision')>-1) ? 1 : 0;
            stat.maxRound = fight.lastRound > stat.maxRound ? fight.lastRound : stat.maxRound;
        }
        return stat;
    }

    /**
     * @param {*} stat 
     * @returns 
     */
    getBaseStyleFromFightStat(stat) {
        return this.brain.baseStyleNetwork.ask({
            winsKo: stat.winKo,
            winsSub: stat.winSub,
            winsDec: stat.winSub,
            lossKo: stat.lossKo,
            lossSub: stat.lossSub,
            lossDec: stat.lossDec,
            td: stat.td > 0 ? 1 : 0,
            kd: stat.kd > 0 ? 1 : 0
        });
    }
}
