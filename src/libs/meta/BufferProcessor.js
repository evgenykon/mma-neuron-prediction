import BufferProcessorEntity from "../entities/v2/BufferProcessorEntity.js";
import MetaItemTypeEnum from './enum/MetaItemTypeEnum.js';
import BufferProcessorTypeEnum from "./enum/BufferProcessorTypeEnum.js";
import FighterEntityL1 from "../entities/v2/FighterEntityL1.js";
import WeightCategoryEntity from "../entities/v2/WeightCategoryEntity.js";
import FighterEntityL2 from "../entities/v2/FighterEntityL2.js";
import FighterEntityL3 from "../entities/v2/FighterEntityL3.js";
import BaseStyleEntity from "../entities/v2/BaseStyleEntity.js";
import FightEntity from "../entities/v2/FightEntity.js";
import FighterL1Validator from "../validators/FighterL1Validator.js";
import EmptyFighterNameError from "../errors/EmptyFighterNameError.js";
import FighterL2Validator from "../validators/FighterL2Validator.js";
import FightValidator from "../validators/FightValidator.js";

/**
 * 
 */
export default class BufferProcessor {
    constructor(buffer, metaItem) {
        this.buffer = buffer;
        this.metaItem = metaItem;
    }

    getDataObjects() {
        let result = [];
        for (let row of this.buffer) {
            if (this.metaItem.type === MetaItemTypeEnum.FIGHTERS) {
                try {
                    let fighterL1 = this.processFighterL1Item(row);
                    result.push(new BufferProcessorEntity(BufferProcessorTypeEnum.FIGHTER, fighterL1));
                    if (fighterL1.lastFightWeight) {
                        //result.push(new BufferProcessorEntity(BufferProcessorTypeEnum.WEIGHT_CATEGORY, this.processWeightCategoryItem(fighterL1, fighterL2)));
                    }
                    if (fighterL1.baseStyle) {
                        result.push(new BufferProcessorEntity(BufferProcessorTypeEnum.BASE_STYLE, this.processBaseStyleEntity(fighterL1)));
                    }
                } catch(e) {
                    if (e instanceof EmptyFighterNameError) {
                        console.error('EmptyFighterNameError', row);
                        continue;
                    } else {
                        throw e;
                    }
                }
                try {
                    const fighterL2 = this.processFighterL2Item(row);
                    result.push(new BufferProcessorEntity(BufferProcessorTypeEnum.FIGHTER, fighterL2));
                } catch (e) {
                    if (e instanceof EmptyFighterNameError) {
                        console.error('EmptyFighterNameError', row);
                        continue;
                    } else {
                        throw e;
                    }
                }
                try {
                    const fighterL3 = this.processFighterL3Item(row);
                    result.push(new BufferProcessorEntity(BufferProcessorTypeEnum.FIGHTER, fighterL3));
                } catch (e) {
                    if (e instanceof EmptyFighterNameError) {
                        console.error('EmptyFighterNameError', row);
                        continue;
                    } else {
                        throw e;
                    }
                }

            } else if (this.metaItem.type === MetaItemTypeEnum.FIGHTS) {
                try {
                    const fight = this.processFight(row);
                    result.push(new BufferProcessorEntity(BufferProcessorTypeEnum.FIGHT, fight));
                } catch (e) {
                    throw e;
                }

                // сразу добавить статистику по бою к бойцам нельзя, бойцов может не быть
            } else {
                console.error('Unknown meta item', this.metaItem)
            }
        }
        return result;
    }

    /**
     * @param {*} item 
     * @returns {FighterEntityL1}
     */
    processFighterL1Item(item) {
        let fighter = new FighterEntityL1();
        for (let m of this.metaItem.structure) {
            for (let field of Object.keys(fighter)) {
                if (typeof m[field] === 'undefined') {
                    continue;
                }
                fighter[field] = item[m[field]];
            }
        }
        return this.validateFighterL1(fighter);
    }

    
    /**
     * @param {*} item 
     * @returns {FighterEntityL2}
     */
    processFighterL2Item(item) {
        let fighter = new FighterEntityL2();
        for (let m of this.metaItem.structure) {
            for (let field of Object.keys(fighter)) {
                if (typeof m[field] === 'undefined') {
                    continue;
                }
                fighter[field] = item[m[field]];
            }
        }
        return this.validateFighterL2(fighter);
    }

    /**
     * @param {*} item 
     * @returns {FighterEntityL3}
     */
    processFighterL3Item(item) {
        let fighter = new FighterEntityL3();
        for (let m of this.metaItem.structure) {
            for (let field of Object.keys(fighter)) {
                if (typeof m[field] === 'undefined') {
                    continue;
                }
                fighter[field] = item[m[field]];
            }
        }
        return fighter;
    }

    /**
     * @param {FighterEntityL1} fighterL1 
     * @param {FighterEntityL2} fighterL2 
     * @returns {WeightCategoryEntity}
     */
    processWeightCategoryItem(fighterL1, fighterL2) {
        let entity = new WeightCategoryEntity();
        entity.name = fighterL1.name;
        entity.height = fighterL1.height;
        entity.reach = fighterL1.reach;
        entity.winsPrc = fighterL2.winsToAllFightsPrc;
        entity.winsKoPrc = fighterL2.winsByKoToAllWinsPrc;
        entity.winsDecPrc = fighterL2.winsByDecToAllWinsPrc;
        entity.winsDecSplitToAllWinsPrc = fighterL2.winsByDecToAllWinsPrc;
        entity.winsSubPrc = fighterL2.winsBySubToAllWinsPrc;
        entity.lossKoPrc = fighterL2.lossKoPrc;
        return entity;
    }

    /**
     * @param {FighterEntityL1} fighterL1 
     * @returns {BaseStyleEntity} 
     */
    processBaseStyleEntity(fighterL1) {
        let entity = new BaseStyleEntity();
        entity.baseStyle = fighterL1.baseStyle;
        entity.winsKoToAllPrc = fighterL1.winsByKoToAllWinsPrc;
        entity.winsSubToAllPrc = fighterL1.winsBySubToAllWinsPrc;
        entity.winsDecToAllPrc = fighterL1.winsDecToAllPrc;
        entity.lossKoToAllPrc = fighterL1.lossKoToAllPrc;
        entity.lossSubToAllPrc = fighterL1.lossSubToAllPrc;
        entity.lossDecToAllPrc = fighterL1.lossDecToAllPrc;
        entity.tdDef = fighterL1.tdDef;
        entity.tdAccur = fighterL1.tdAccur;
        return BaseStyleEntity;
    }

    /**
     * @param {*} item 
     * @returns {FightEntity}
     */
    processFight(item) {
        let fight = new FightEntity();
        for (let m of this.metaItem.structure) {
            for (let field of Object.keys(fight)) {
                if (typeof m[field] === 'undefined') {
                    continue;
                }
                fight[field] = item[m[field]];
            }
        }
        return this.validateFight(fight);
    }

    /**
     * @param {FighterEntityL1} entity 
     * @returns 
     */
    validateFighterL1(entity) {
        return (new FighterL1Validator(entity)).validate();
    }

    
    /**
     * @param {FighterEntityL2} entity 
     * @returns 
     */
    validateFighterL2(entity) {
        return (new FighterL2Validator(entity)).validate();
    }

    /**
     * @param {FightEntity} entity 
     * @returns 
     */
    validateFight(entity) {
        return (new FightValidator(entity)).validate();
    }
}