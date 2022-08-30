# MMA Prediction

## Data sources

https://fighters.mixedmartialarts.com
https://fightpages.com
https://github.com/grappler185/MMA
http://ufcstats.com/fight-details/2f4d42e0b9696f71
https://www.kaggle.com/datasets/mdabbert/ultimate-ufc-dataset/discussion

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

## HowTo

### Collecting data

1. Download data in CSV or JSON
2. Place data to `./data/export/csv` or `./data/export/json`
3. Describe data in `./data/export/meta.json` according to example
4. Run `npm install`
5. Run `node runner/collect_data.js`

For reset data run `node runner/clear_data.js`

### Describing data statistic

1. Run `node runner/get_data_stat.js` for browse available parameters
2. Run same with parameters