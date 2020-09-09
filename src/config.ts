"use strict";

export const config = {
  api: {
    host: "localhost" || process.env.API_HOST,
    port: 8080 || process.env.API_PORT,
  },
  database: {
    main: {
      protocol: process.env.MONGO_PROTOCOL || "mongodb",
      host: process.env.MONGO_HOST || "localhost",
      database: process.env.MONGO_DB || "ozo",
      user: process.env.MONGO_USER,
      pwd: process.env.MONGO_PWD,
    },
  },
  auth: {
    secret: {
      jwt: process.env.JWT_SECRET || 'asretdfyug7t86r75FUGYY*t86r75dytKUYG7t8r675dYRTYGUoy7t8r675dyRKTGYIt786r75DYTKGYIt7r65dyrTYGIT786r5dtkGYHBKJHUY*(()Y*TOGfuty86rohI&t87tG',
    },
  },
};
