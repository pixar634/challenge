"use strict";
require("dotenv").config();

import * as Hapi from "@hapi/hapi";

// import { v0 } from "./api/v0";

const init = async () => {
  const { config } = require("./config");
  let cron = require("node-cron");

  // CONFIGURE SERVER CREDS FROM CONFIG FILE
  const server = Hapi.server({
    port: config.api.port,
    host: config.api.host,
  });

  // CHECKS THE CURRENT TIME IN IST
  function getTimeForMail() {
    let date_ob = new Date();
    let currentOffset = date_ob.getTimezoneOffset();
    let ISTOffset = 330;
    let ISTTime = new Date(
      date_ob.getTime() + (ISTOffset + currentOffset) * 60000
    );
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let hours = ISTTime.getHours();
    let date = ISTTime.getDate();
    let minutes = ISTTime.getMinutes();

    var API_KEY = process.env.API_KEY;
    var DOMAIN = process.env.DOMAIN_NAME;
    var mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });

    const data = {
      from: "test@sandbox9b55f02af3404d638506e482bcfa0527.mailgun.org",
      to: "soumavapaul93@gmail.com",
      subject: "Hello",
      text: "Hey There ! Hope you doing well!",
    };

    // SEND ONLY IF ITS THE 2ND OF SEPTEMBER, 10:00 PM
    if (hours == 22 && minutes == 45 && month == "09" && date == 2) {
      //FIRE MAIL
      mailgun.messages().send(data, (error, body) => {
        if (error) console.log(error);
        else console.log(body);
      });
    } else {
      console.log("Its not time yet!");
    }
  }
  //END OF GETTIMEFORMAIL

  //SCHEDULER CRON JOB
  cron.schedule("* * * * *", () => {
    console.log("running a task every minute");
    getTimeForMail();
  });

  //START SERVER
  await server.start();
  console.log(process.env.API_KEY);
  // console.log(minutes);
};

init();
