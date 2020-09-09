
'use strict';

import { Email } from './lib/Email';
import { Program } from './lib/Program';
import { Survey } from './lib/Survey';
import { User } from './lib/User';
import { Auth } from './lib/Auth';
export class Api {

    email: Email;
    program: Program;
    survey: Survey;
    user: User;
    auth: Auth;

    constructor(config, models) {
        this.auth = new Auth(models, config);
        this.user = new User(models);
        this.email = new Email(models);
        this.program = new Program(models);
        this.survey = new Survey(models);
        //make one for surveyQ 
    }
}