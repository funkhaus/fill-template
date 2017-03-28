#!/usr/bin/env node
"use strict"

const prompt = require('prompt');
const fs = require('fs');
const deepsearch = require('./deepsearch');

// Load template and scan for placeholders
const file = fs.readFileSync('./template.css', { encoding: 'utf8' });
const matches = file.match(/{{.*}}/g);

// Save required and optional placeholders
let placeholders = [];
matches.forEach( function(placeholder){

    // Skip if we've already saved this placeholder
    if( placeholders.filter( function(val){ return val.placeholder == placeholder; } ).length ){
        return;
    }

    // Save the name of the placeholder
    let nameRegex = /{{\s?(\S*)\s?.*}}/g;
    let name = nameRegex.exec(placeholder)[1];

    let toAdd = {
        name: name,
        placeholder: placeholder,
        value: ''
    };

    // Does this match have a default specified? If so, it's optional
    let defaultRegex = /default:(\S*)/g;
    let defaultCheck = placeholder.match(defaultRegex);
    if( defaultCheck != null ){
        let specifiedDefault = defaultRegex.exec(defaultCheck)[1];
        toAdd['default'] = specifiedDefault
    }

    // Add to placeholder list
    placeholders.push(toAdd);
});

console.log(placeholders);
