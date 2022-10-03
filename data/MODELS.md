
## Model parameters

- Age 
- Height 
- Reach 
- Country
- Team
- Wins 
- Losses 
- Wins by KO+TKO
- Wins by decision
- Wins by submission
- Lossess by KO+TKO
- Lossess by submissions
- Lossess by decision
- Takedown defence
- Takedown accuracy
- Takedown avg per minute
- Sign.strikes defence
- Sign.strikes accuracy
- Sign.strikes hit per minute
- Sign.strikes losted per minute

## Data needed at this moment

- Normal Weight
- Last 5 fights ratio W/L 
- Last fight result 
- Career age
- Max round in career
- Total rounds in career
- Max sign. strikes hitted in career
- Max sign. strikes misess in career
- Title wins
- Title defences
- Wins by split decision
- Lossess by split decision

## Calculation

```
Parameter                   Hypoteses: which factors and statistic facts need to use in calculation
f1.height = 0.8;            <-- from all category heights min/max
f1.weight = 0.8;            <-- before fight
f1.reach = 0.5;             <-- from all category reaches min/max
f1.endurance = 1;           <-- count of 5 round fights in career, age
f1.strikingForce = 0.6;     <-- avg knockouts wins
f1.strikingSkill = 0.4;     <-- sign strikes per min, sign strikes accur, ssLostPerMin, lossKo, ssLostPerMin, ssDef, wins by KO
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
```


### TODO
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
