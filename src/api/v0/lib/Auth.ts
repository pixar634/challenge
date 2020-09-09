'use strict';

import * as Boom from '@hapi/boom';
import * as Bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

let _models, _config;

export class Auth {
    constructor(models, config) {
        _models = models;
        _config = config;
    }

    async login(request) {
        const { email, password } = request.payload;
        let user;
        try {
            user = await _models.User.findOne({ email });
            if (!user) throw new Error('email or password incorrect');
            let trusted = await Bcrypt.compare(password || '', user.password);
            if (!trusted) throw new Error('email or password incorrect');
            return {
                token: jwt.sign({ _id: user._id }, _config.auth.secret.jwt, { expiresIn: '5d' })
            };
        } catch (err) {
            return Boom.forbidden(err);
        }
    }
}