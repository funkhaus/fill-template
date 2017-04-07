#!/usr/bin/env node
"use strict"

const prompt = require('prompt');
const fs = require('fs');
const formatHex = require('./utils/formatHex.js');
const getPlaceholders = require('./utils/getPlaceholders.js');
const setupSchema = require('./utils/setupSchema.js');
const runPrompt = require('./utils/runPrompt.js');

const program = require('commander');

program
    .version('1.1.0')
    .option('-t, --template [file]', 'Path to the desired template file', './templates/template.css')
    .option('-e, --encoding [encoding]', 'Template file encoding [utf8]', 'utf8')
    .option('-o, --output [output]', 'Name of output file or output root directory', 'login.css')
    .parse(process.argv);

// Load template and scan for placeholders
let template = fs.readFileSync(program.template, { encoding: program.encoding });

// Save required and optional placeholders
const matches = template.match(/{{.*}}/g);
let placeholders = getPlaceholders(matches);

// Prep prompt schema (see https://www.npmjs.com/package/prompt)
prompt.start();
let schema = setupSchema(placeholders);

// Remove anything that's not the placeholder name
// (http://stackoverflow.com/questions/3954927/js-regex-how-to-replace-the-captured-groups-only)
template = template.replace( /({{\s+\S*\s*?)(.*?)(\s}})/g, '$1$3' );

// Run prompt
runPrompt(prompt, schema, placeholders, template)
    .then(newFile => {
        // Write the file!
        fs.writeFileSync(program.output, newFile);
        console.log('File created at login.css');
    });
