import v from 'validator';
import EmptyFighterNameError from '../errors/EmptyFighterNameError.js';
import BaseValidator from './BaseValidator.js';

export default class FighterL1Validator extends BaseValidator {
    
    /**
     * @param {FighterEntityL1} entity 
     */
    constructor(entity) {
        super();
        this.entity = entity;
    }

    /**
     * @returns {FighterEntityL1} 
     */
    validate() {
        if (!this.entity.name) {
            throw new EmptyFighterNameError();
        }
        if (this.entity.height) {
            this.entity.height = this.sanitizeHeight(this.entity.height);
        } else {
            this.entity.height = undefined;
        }
        if (this.entity.winsKo) {
            this.entity.winsKo = this.sanitizeInt(this.entity.winsKo);
        }
        if (this.entity.winsSub) {
            this.entity.winsSub = this.sanitizeInt(this.entity.winsSub);
        }
        if (this.entity.lossKo) {
            this.entity.lossKo = this.sanitizeInt(this.entity.lossKo);
        }
        if (this.entity.lossSub) {
            this.entity.lossSub = this.sanitizeInt(this.entity.lossSub);
        }
        if (this.entity.winsDecTotal) {
            this.entity.winsDecTotal = this.sanitizeInt(this.entity.winsDecTotal);
        }
        if (this.entity.lossDecTotal) {
            this.entity.lossDecTotal = this.sanitizeInt(this.entity.lossDecTotal);
        }
        if (this.entity.lastFightWeight) {
            this.entity.lastFightWeight = this.sanitizeInt(this.entity.lastFightWeight);
        }
        return this.entity;
    }

    sanitizeHeight(height) {
        let num = null;
        if (/[0-9]\'[0-9]{2}\"/g.test(height)) {
            const ft = height.substr(0,height.length-1).split("'");
            num = parseInt(ft[0]) * 12 + parseInt(ft[1]);

        } else if (/[0-9]\'[0-9]{1}\"/g.test(height)) {
            const ft = height.substr(0,height.length-1).split("'");
            num = parseInt(ft[0]) * 12 + parseInt(ft[1]);

        } else if (v.isDecimal(''+height)) {
            num = Math.round(height*139);

        } else {
            console.error('Input', height);
            throw Error('sanitizeHeight: unexpected height format');
        }
        if (isNaN(num)) {
            console.error('Input', height);
            throw Error('sanitizeHeight: error while sanitizing value');
        }
        return num;
    }

    sanitizeInt(value) {
        const num = parseInt(value.replace(/[^0-9]+/g));
        if (isNaN(num)) {
            console.error('Input', value);
            throw Error('sanitizeInt: error while sanitizing value');
        }
        return num;
    }
}