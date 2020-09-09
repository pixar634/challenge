'use strict';

import { Routes } from './Routes';

export const v0 = {
    name: 'v0',
    version: '0.0.0',
    register: async (server, options) => {
        const routes = new Routes(options.config, options.models);
        server.route(routes.get());
    }
};