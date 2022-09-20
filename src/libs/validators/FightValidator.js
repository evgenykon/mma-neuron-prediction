import md5 from 'js-md5';
import EmptyFighterNameError from '../errors/EmptyFighterNameError.js';
import BaseValidator from './BaseValidator.js';

export default class FightValidator extends BaseValidator {
    
    /**
     * @param {FightEntity} entity 
     */
    constructor(entity) {
        super();
        this.entity = entity;
    }

    validate() {
        if (!this.entity.f1Name) {
            throw new EmptyFighterNameError();
        }
        if (!this.entity.f2Name) {
            throw new EmptyFighterNameError();
        }
        if (this.entity.f1KD) {
            this.entity.f1KD = this.sanitizeInt(this.entity.f1KD);
        }
        if (this.entity.f1SStr) {
            this.entity.f1SStr = this.sanitizeOfStr(this.entity.f1SStr);
        }
        if (this.entity.f1SSPrc) {
            this.entity.f1SSPrc = this.sanitizePrc(this.entity.f1SSPrc);
        }
        if (this.entity.f1TotalStr) {
            this.entity.f1TotalStr = this.sanitizeOfStr(this.entity.f1TotalStr);
        }
        if (this.entity.f1Td) {
            this.entity.f1Td = this.sanitizeOfStr(this.entity.f1Td);
        }
        if (this.entity.f1TdPrc) {
            this.entity.f1TdPrc = this.sanitizePrc(this.entity.f1TdPrc);
        }
        if (this.entity.f1SubAtt) {
            this.entity.f1SubAtt = this.sanitizeInt(this.entity.f1SubAtt);
        }
        if (this.entity.f2KD) {
            this.entity.f2KD = this.sanitizeInt(this.entity.f2KD);
        }
        if (this.entity.f2SStr) {
            this.entity.f2SStr = this.sanitizeOfStr(this.entity.f2SStr);
        }
        if (this.entity.f2SSPrc) {
            this.entity.f2SSPrc = this.sanitizePrc(this.entity.f2SSPrc);
        }
        if (this.entity.f2TotalStr) {
            this.entity.f2TotalStr = this.sanitizeOfStr(this.entity.f2TotalStr);
        }
        if (this.entity.f2Td) {
            this.entity.f2Td = this.sanitizeOfStr(this.entity.f2Td);
        }
        if (this.entity.f2TdPrc) {
            this.entity.f2TdPrc = this.sanitizePrc(this.entity.f2TdPrc);
        }
        if (this.entity.f2SubAtt) {
            this.entity.f2SubAtt = this.sanitizeInt(this.entity.f2SubAtt);
        }
        if (this.entity.format) {
            this.entity.format = this.sanitizeFormat(this.entity.format);
        }
        if (this.entity.lastRound) {
            this.entity.lastRound = this.sanitizeInt(this.entity.lastRound);
        }
        if (this.entity.date) {
            this.entity.date = this.sanitizeDate(this.entity.date);
        }

        this.entity.id = md5(this.entity.f1Name + this.entity.f2Name + this.date + this.location);
        return this.entity;
    }

    sanitizeInt(value) {
        const num = parseInt(value);
        if (isNaN(value)) {
            console.error('Input', value);
            throw Error('sanitizeInt: error while sanitizing value');
        }
        return num;
    }

    sanitizeOfStr(value) {
        if (/[0-9]{2} of [0-9]/g.test(value)) {
            return parseInt(value.substr(0, 2));

        } else if (/[0-9]{1} of [0-9]/g.test(value)) {
            return parseInt(value.substr(0, 1));

        } else if (/[0-9]{3} of [0-9]/g.test(value)) {
            return parseInt(value.substr(0, 3));
            
        } else {
            throw Error('sanitizeOfStr: Incorrect format');
        }
    }

    sanitizePrc(value) {
        if (/[0-9]{1}%/g.test(value)) {
            return parseInt(value.substr(0, 1));
        } else if (/[0-9]{2}%/g.test(value)) {
            return parseInt(value.substr(0, 2));
        } else {
            throw Error('sanitizePrc: Incorrect format');
        }
    }

    sanitizeFormat(value) {
        if (/[0-9] Rnd/g.test(value)) {
            return parseInt(value.substr(0,1));

        } else if (/No Time Limit/g.test(value)) {
            return 999;

        } else {
            throw Error('sanitizeFormat: Incorrect format');
        }
    }

    sanitizeDate(value) {
        if (/[A-z]+ [0-9]{2}\, [0-9]{4}/g.test(value)) {
            return Date.parse(value);
        } else {
            console.log(value);
            throw Error('sanitizeDate: incorrect format');
        }
    }
}