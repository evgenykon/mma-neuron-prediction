import v from 'validator';
import FighterEntityL2 from '../entities/v2/FighterEntityL2.js';
import EmptyFighterNameError from '../errors/EmptyFighterNameError.js';
import BaseValidator from './BaseValidator.js';

export default class FighterL2Validator extends BaseValidator {
    /**
     * @param {FighterEntityL2} entity 
     */
     constructor(entity) {
        super();
        this.entity = entity;
    }

    validate() {
        if (!this.entity.name) {
            throw new EmptyFighterNameError();
        }
        if (this.entity.tdDef) {
            this.entity.tdDef = this.sanitizeInt(this.entity.tdDef);
        } else {
            this.entity.tdDef = undefined;
        }
        if (this.entity.tdAccur) {
            this.entity.tdAccur = this.sanitizeInt(this.entity.tdAccur);
        } else {
            this.entity.tdAccur = undefined;
        }
        if (this.entity.tdPerMin) {
            this.entity.tdPerMin = this.sanitizeInt(this.entity.tdPerMin);
        } else {
            this.entity.tdPerMin = undefined;
        }
        if (this.entity.ssDef) {
            this.entity.ssDef = this.sanitizeInt(this.entity.ssDef);
        } else {
            this.entity.ssDef = undefined;
        }
        if (this.entity.ssAccur) {
            this.entity.ssAccur = this.sanitizeInt(this.entity.ssAccur);
        } else {
            this.entity.ssAccur = undefined;
        }
        if (this.entity.ssHitPerMin) {
            this.entity.ssHitPerMin = this.sanitizeFloat(this.entity.ssHitPerMin);
        } else {
            this.entity.ssHitPerMin = undefined;
        }
        if (this.entity.ssLostPerMin) {
            this.entity.ssLostPerMin = this.sanitizeFloat(this.entity.ssLostPerMin);
        } else {
            this.entity.ssLostPerMin = undefined;
        }
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

    sanitizeFloat(value) {
        if (!v.isDecimal(''+value)) {
            console.error('Input', value);
            throw Error('sanitizeInt: error while sanitizing value');
        }
        return parseFloat(''+value);
    }
}