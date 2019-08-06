#!/usr/bin/env ts-node
import { DbHelper } from '../src/dbclient/DbHelper';
import { writeFileSync } from 'fs';

async function run() {
    let dbh = new DbHelper();
    let dataSet = await dbh.getFaceAndLabels('LFW', '10EXAMPLES');
    writeFileSync('model.json', JSON.stringify({ "data": dataSet }));
}

run().catch(err => console.log(err));