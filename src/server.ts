"use strict";
require("dotenv").config();

import * as Hapi from "@hapi/hapi";

// import { v0 } from "./api/v0";

const init = async () => {
  const { config } = require("./config");
  let cron = require("node-cron");
  let date_ob = new Date();
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let hours = date_ob.getHours();

  const server = Hapi.server({
    port: config.api.port,
    host: config.api.host,
  });

  var API_KEY = process.env.API_KEY;
  var DOMAIN = process.env.DOMAIN_NAME;
  var mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });

  const data = {
    from: "test@sandbox9b55f02af3404d638506e482bcfa0527.mailgun.org",
    to: "soumavapaul93@gmail.com",
    subject: "Hello",
    text: "Hey There ! Hope you doing well!",
  };
  if (hours == 22 && month == "09") {
    mailgun.messages().send(data, (error, body) => {
      if (error) console.log(error);
      else console.log(body);
    });
  }

  cron.schedule("* * * * *", () => {
    console.log(month, "running a task every minute");
  });

  await server.start();
  console.log(process.env.API_KEY);
};

init();
