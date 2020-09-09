'use strict';

import * as Boom from '@hapi/boom';
import * as Bcrypt from 'bcrypt';
// import { Types } from 'mongoose';

let _models;

export class User {
    constructor(models) {
        _models = models;
    }

    async get() {
        let users;
        try {
            users = await _models.User.find({}, { password: 0 }).lean();
            return users;
        } catch (err) {
            return Boom.internal(err);
        }
    }

    async post(request) {
        let user = request.payload;
        try {
            user.password = await Bcrypt.hash(user.password, 10);
            user = new _models.User(user);
            await user.save();
            return { _id: user._id, status: 'created' };
        } catch (err) {
            return Boom.conflict(err);
        }
    }

    // async put(request) {
    //   let user = request.payload, res;
    //   try {
    //     delete user.password;
    //     res = await _models.User.updateOne({ _id: Types.ObjectId(request.query._id) }, { $set: user });
    //     return res;
    //   } catch (err) {
    //     return Boom.badData(err);
    //   }
    // }

}
