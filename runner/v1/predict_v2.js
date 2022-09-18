/**
 * ca28d243e6192a5109a73dd769992372 { name: 'Khabib Nurmagomedov', sourcesCount: 2, filledFieldsCount: 13 }
FightersDataStructure {
  name: 'Khabib Nurmagomedov',
  age: 32,
  height: 5.833,
  reach: 70,
  country: 'Russia',
  team: 'Fightspirit Team',
  wins: 29,
  losses: 29,
  winsKo: 8,
  winsDec: 10,
  winsSub: 11,
  winsSplit: undefined,
  lossKo: undefined,
  lossDec: undefined,
  lossSub: undefined,
  lossSplit: undefined,
  tdDef: 84,
  tdAccur: 48,
  tdPerMin: 5.32,
  ssDef: 65,
  ssAccur: 48,
  ssHitPerMin: 4.1,
  ssLostPerMin: 1.75,
  normalWeight: undefined,
  lastFightWinRatio: undefined,
  lastFightWins: undefined,
  careerAge: undefined,
  maxRoundNumber: undefined,
  totalRoundInCareer: undefined,
  titleWins: undefined,
  titleAttempts: undefined,
  stance: 'Orthodox',
  fightsList: [
    {
      fighter1: [Object],
      fighter2: [Object],
      format: '5 Rnd (5-5-5-5-5)',
      winner: 'Khabib Nurmagomedov',
      winBy: 'Submission',
      lastRound: '4',
      lastRoundTime: '3:03',
      referree: 'Herb Dean',
      date: 'October 06, 2018',
      location: 'Las Vegas, Nevada, USA'
    },
    ...
  ]
}

Параметр                    Гипотезы: какие факторы могут влиять на параметр
f1.height = 0.8;            <-- from all category heights min/max
f1.weight = 0.8;            <-- before fight
f1.reach = 0.5;             <-- from all category reaches min/max
f1.endurance = 1;           <-- count of 5 round fights in career, age
f1.strikingForce = 0.6;     <-- avg knockouts wins
f1.strikingSkill = 0.4;     <-- sign strikes per min, sign strikes accur, ssLostPerMin, lossKo, ssLostPerMin, ssDef
f1.strikingStamina = 0.8;   <-- ssLostPerMin, lossKo, winsDec, lossDec, lossSplit, winsSplit
f1.distanceControl = 0.8;   <-- wins of strikers, base: box, muai tai, karate
f1.movingSkill = 0.8;       <-- wins of strikers, base: box, muai tai, karate
f1.clinchSkill = 0.9;       <-- base: muai tai, wrestling, karate
f1.reactionSpeed = 0.8;     <-- wins of strikers, high prc of wins by KO, low prc of loses by KO
f1.takedownDefence = 1;     <-- tdDef, wins of wrestlers
f1.takeDownSkill = 1;       <-- tdAccur, tdPerMin, tdPerMin, wins of wrestlers
f1.wrestling = 1;           <-- tdAccur, tdPerMin, winsSub, lossDec, wins of wrestlers
f1.submissionSkill = 0.9;   <-- winsSub, lossSub
f1.preparingQuality = 0.8;  <-- own location, short notice, conflicts before fighters
f1.fightLocationAffect = 0.4; <-- home fight for fighter, home fight for opponent, wins in home fights, loses, wins in foreign location, loses in foreign location
f1.mentalStamina = 0.7;     <-- wins after loses, wins with high damage, wins with equal rounds, wins by split decision, wins of current opponent, loses of current opponent
 */

/**
 * TODO
 * 1. всех бойцов разобрать по категориям (может быть несколько)
 *  1.1 весовые
 *  1.2 базовый стиль
 * 2. для каждой категории
 *  2.1 min-max height
 *  2.2 min-max reach
 *  2.3 min-max prc of KO by all fights
 *  2.4 min-max prc loss of KO
 *  2.5 min-max prc wins of decision
 *  2.6 min-max prc loss of decision
 *  2.7 min-max prc wins of sub
 *  2.8 min-max prc loss of sub
 *  2.9 min-max prc win of split
 *  2.10 min-max prc loss of split
 * 3. Before-fight stat file generator, формирующий json для боя и каждого бойца с данными на данный момент
 * 4. Calculating endurance
 * 5. Calculating striking force
 * 6. Calculating strkiing skill
 * 7. Calculating striking stamina
 * 8. Calculating distance control
 * 9. Calculating moving skill
 * 10. Calculating clinch skill
 * 11. Calculating reaction speed
 * 12. Calculating takedown defence
 * 13. Calculating takedown skill
 * 14. Calculating wrestling skill
 * 15. Calculating submission skill
 * 16. Set fight preparing quality
 * 17. Calculate fight location affect
 * 18. Calculating mental stamina
 */