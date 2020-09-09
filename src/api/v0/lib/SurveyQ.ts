'use strict';

import * as Boom from '@hapi/boom';
import {
    Types
} from 'mongoose';

let _models;

export class SurveyQ {
    constructor(models) {
        _models = models;
    }

    async get(request) {

        let surveyQ;
        try {
            surveyQ = await _models.Program.find(request.query._id).lean();
            return surveyQ;
        } catch (err) {
            return Boom.internal(err);
        }
    }
    // POST NEW QUESTIONS ON DATABASE FROM OZOPANEL

    async post(request) {
        try {
            request.payload.program_id = Types.ObjectId(request.auth.credentials._id);
            const surveyq = new _models.SurveyQ(request.payload);
            await surveyq.save();
            return surveyq;
        } catch (err) {
            return Boom.internal(err);
        }
    }
}