# MMA Prediction

## Machine learning sources

### Data

https://fighters.mixedmartialarts.com
https://fightpages.com
https://github.com/grappler185/MMA
http://ufcstats.com/fight-details/2f4d42e0b9696f71
https://www.kaggle.com/datasets/mdabbert/ultimate-ufc-dataset/discussion

### ML usefull libs

https://learn.ml5js.org/#/reference/neural-network
https://brain.js.org/#/getting-started
https://danfo.jsdata.org/api-reference/general-functions

## Data description

See [data/README](data/README.md)

## HowTo use

### 1. Collecting data

1. Download data in CSV or JSON
2. Place data to `./data/export/csv` or `./data/export/json`
3. Describe data in `./data/export/meta.json` according to example
4. Run `npm install`
5. Run `node runner/collect_data.js`

For reset data run `node runner/clear_data.js`

### 2. Describing data statistic

1. Run `node runner/get_data_stat.js` for browse available parameters
2. Run same with parameters

### 3. Embedding and normalization

