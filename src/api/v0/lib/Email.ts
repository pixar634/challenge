'use strict';

import * as Boom from '@hapi/boom';
import {
    Types
} from 'mongoose';

let _models;

export class Email {
    constructor(models) {
        _models = models;
    }
    async get(request) {
        const { _id, config } = request.query;
        let emails;
        try {
            let $project = { config: 0 };
            if (config) delete $project.config;
            let query: any = { user_id: Types.ObjectId(request.auth.credentials._id) };
            if (_id) query._id = Types.ObjectId(_id);
            emails = await _models.Email.find(query, $project).lean();
            return emails;
        } catch (err) {
            return Boom.internal(err);
        }
    }
    async post(request) {
        try {
            request.payload.user_id = Types.ObjectId(request.auth.credentials._id);
            const crawler = new _models.Crawler(request.payload);
            await crawler.save();
            return crawler;
        } catch (err) {
            return Boom.internal(err);
        }
    }

}