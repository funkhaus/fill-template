#!/usr/bin/env node
"use strict"

const prompt = require('prompt');
const fs = require('fs');
const formatHex = require('./utils/formatHex.js');
const getPlaceholders = require('./utils/getPlaceholders.js');
const setupSchema = require('./utils/setupSchema.js');
const runPrompt = require('./utils/runPrompt.js');

// Load template and scan for placeholders
const template = fs.readFileSync(__dirname + '/template.css', { encoding: 'utf8' });

// Save required and optional placeholders
const matches = template.match(/{{.*}}/g);
let placeholders = getPlaceholders(matches);

// Prep prompt schema (see https://www.npmjs.com/package/prompt)
prompt.start();
let schema = setupSchema(placeholders);

// Run prompt
runPrompt(prompt, schema, placeholders, template)
    .then(newFile => {
        // Write the file!
        fs.writeFileSync('login.css', newFile);
        console.log('File created at login.css');
    });
