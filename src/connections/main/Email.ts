'use strict';

import { Schema, Types } from 'mongoose';

const EmailSchema = new Schema({
    sequence: {
        type: Number,
        // required: true
    },
    delay: {
        type: Number,
    },
    title: {
        type: String,
        // required: true
    },
    html: {
        type: String,
        // either template id or make our own html and save here, ejs conversion from string to html (explore this)
    },
    program: {
        type: String
    },
    email_analytics: {
        type: Array,
        "default": []
    },

    survey_id: {
        type: Number
    }
}, { timestamps: true });

module.exports = db => db.model('Email', EmailSchema);
