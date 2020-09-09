'use strict';

import * as Boom from '@hapi/boom';
import {
    Types
} from 'mongoose';

let _models;

export class Program {
    constructor(models) {
        _models = models;
    }

    async get(request) {

        let program;
        try {
            program = await _models.Program.find(request.query._id).lean();
            return program;
        } catch (err) {
            return Boom.internal(err);
        }
    }
    // // POST NEW PROGRAMS ON DATABASE FROM OZOPANEL

    // async post(request) {
    //     try {
    //         request.payload.user_id = Types.ObjectId(request.auth.credentials._id);
    //         const survey = new _models.Survey(request.payload);
    //         await survey.save();
    //         return survey;
    //     } catch (err) {
    //         return Boom.internal(err);
    //     }
    // }
    // // EDIT PROGRAM DETAILS FROM OZOPANEL
    // async put(request) {
    //     try {
    //         const res = await _models.Survey.updateOne({ _id: Types.ObjectId(request.query._id) }, {
    //             $set: request.payload
    //         });
    //         return res;
    //     } catch (err) {
    //         return Boom.internal(err);
    //     }
    // }
    // // DELETE PROGRAM DETAILS FROM OZOPANEL
    // async delete(request) {
    //     const res = { survey: {} };
    //     try {
    //         res.survey = await _models.Survey.deleteOne({ _id: Types.ObjectId(request.query._id) });
    //         return res;
    //     } catch (err) {
    //         return Boom.internal(err);
    //     }
    // }
}