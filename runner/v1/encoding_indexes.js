const BUFFER_DIR = './data/buffer/';

import IndexLoader from '../src/libs/loader/IndexLoader.js';
import * as dfd from "danfojs-node"
import fs from 'fs';

const countries = (new IndexLoader('countries')).getJson();
const teams = (new IndexLoader('teams')).getJson();
const stances = (new IndexLoader('stances')).getJson();

let encode = new dfd.OneHotEncoder();

const dfCountries = new dfd.DataFrame({
    countries: Object.values(countries),
});
const encodedCountries = {
    fit: encode.fit(dfCountries['countries']),
    transformed: encode.transform(dfCountries['countries'].values)
};
fs.writeFileSync(BUFFER_DIR + '_encoded_countries.json', JSON.stringify(encodedCountries));
console.log('Countries encoded');

const dfTeams = new dfd.DataFrame({
    teams: Object.values(teams),
});
const encodedTeams = {
    fit: encode.fit(dfTeams['teams']),
    transformed: encode.transform(dfTeams['teams'].values)
};
fs.writeFileSync(BUFFER_DIR + '_encoded_teams.json', JSON.stringify(encodedTeams));
console.log('Teams encoded');

const dfStances = new dfd.DataFrame({
    stances: Object.values(stances),
});
const encodedStances = {
    fit: encode.fit(dfStances['stances']),
    transformed: encode.transform(dfStances['stances'].values)
};
fs.writeFileSync(BUFFER_DIR + '_encoded_stances.json', JSON.stringify(encodedStances));
console.log('Stances encoded');
