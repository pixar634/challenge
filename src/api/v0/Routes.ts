"use strict";
import { Api } from './Api';
export class Routes {
  api: Api;

  constructor(config, models) {
    this.api = new Api(config, models);
  }

  get(): Array<any> {
    return [
      {
        method: 'POST',
        path: '/login',
        options: { auth: false },
        handler: this.api.auth.login,
      },
      {
        method: 'GET',
        path: '/user',
        handler: this.api.user.get,
      },
      {
        method: 'POST',
        path: '/user',
        options: { auth: false },
        handler: this.api.user.post,
      },
      {
        method: 'GET',
        path: '/survey',
        handler: this.api.survey.get,
      }
    ];
  }
}
