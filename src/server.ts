"use strict";
require("dotenv").config();

import * as Hapi from "@hapi/hapi";
import { Schema, Types } from "mongoose";

// import { v0 } from "./api/v0";

const init = async () => {
  const { config } = require("./config");
  let cron = require("node-cron");
  var mongoose = require("mongoose");
  const axios = require("axios");
  // CONFIGURE SERVER CREDS FROM CONFIG FILE
  const server = Hapi.server({
    port: config.api.port,
    host: config.api.host,
  });
  let username = process.env.MONGO_USER;
  let password = process.env.MONGO_PASS;
  let cluster = process.env.MONGO_CLUSTER;
  let token = process.env.AIRTABLE_API_KEY;
  let base_key = process.env.AIRTABLE_BASE_KEY;

  /*                            PART  2  BEGINS [  Airtable API data integration into mongoDb database  ]                   */

  try {
    // mongoose.set("useCreateIndex", true);
    await mongoose
      .connect(
        `mongodb+srv://${username}:${password}@${cluster}/ozo?retryWrites=true`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => {
        console.log("MongoDB Connected…");
      });
  } catch (error) {
    console.log(error);
  }
  const DataSchema = new Schema(
    {
      data_id: Types.ObjectId,
    },
    { strict: false, timestamps: true }
  );
  axios
    .get(
      `https://api.airtable.com/v0/${base_key}/ozo?maxRecords=100&view=Grid%20view`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      const savedrecords = res.data;
      console.log(res.data.records, "THIS IS THE DATA");
      // INITIALISE SCHEMA OF COLLECTION
      var Data = mongoose.model("Data", DataSchema);
      // LOAD SCHEMA OF COLLECTION
      const load = new Data(savedrecords);
      // SAVE TO DATABASE
      load.save();
    })
    .catch((error) => {
      console.error(error, "AIRTABLE ERROR");
    });

  /*                                PART 2 ENDS                              */

  await server.start();
};

init();
