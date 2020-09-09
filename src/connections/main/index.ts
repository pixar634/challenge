'use strict';

import * as fs from 'fs';
import * as path from 'path';
import * as mongoose from 'mongoose';

let models;

async function _connect(url) {
    mongoose.set('useCreateIndex', true);
    return await mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true });
}

function readModels(db) {
    const models = {};
    fs
        .readdirSync(__dirname)
        .filter(file => {
            return (file !== path.basename(__filename)) && (file.indexOf('.') !== 0) && ((file.slice(-3) == '.js') || (file.slice(-3) == '.ts'));
        })
        .forEach(file => {
            let model = require(`./${file}`)(db);
            models[model.modelName] = model;
        });
    return models;
}

export const connect = async config => {
    const database = config.database.main;
    const url = `${database.protocol}://${(database.user) ? encodeURIComponent(database.user) : ''}${(database.pwd) ? ':' : ''}${(database.pwd) ? encodeURIComponent(database.pwd) : ''}${(database.pwd) ? '@' : ''}${database.host}/${database.database}?retryWrites=true`;
    const db = await _connect(url);
    if (!models) models = readModels(db);
    return models;
};
