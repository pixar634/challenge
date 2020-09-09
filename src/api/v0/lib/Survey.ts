'use strict';

import * as Boom from '@hapi/boom';
import {
    Types
} from 'mongoose';

let _models;

export class Survey {
    constructor(models) {
        _models = models;
    }

    async get(request) {
        const { _id, config } = request.query;
        let survey;
        try {
            let $project = { config: 0 };
            if (config) delete $project.config;
            let query: any = { user_id: Types.ObjectId(request.auth.credentials._id) };
            if (_id) query._id = Types.ObjectId(_id);
            survey = await _models.Survey.find(query, $project).lean();
            return survey;
        } catch (err) {
            return Boom.internal(err);
        }
    }

    // EDIT SURVEY DETAILS FROM OZOPANEL
    async put(request) {
        try {
            const res = await _models.Survey.updateOne({ _id: Types.ObjectId(request.query._id) }, {
                $set: request.payload
            });
            return res;
        } catch (err) {
            return Boom.internal(err);
        }
    }
    // DELETE SURVEY DETAILS FROM OZOPANEL
    async delete(request) {
        const res = { survey: {} };
        try {
            res.survey = await _models.Survey.deleteOne({ _id: Types.ObjectId(request.query._id) });
            return res;
        } catch (err) {
            return Boom.internal(err);
        }
    }
}