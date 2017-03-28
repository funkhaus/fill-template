#!/usr/bin/env node
"use strict"

const prompt = require('prompt');
const fs = require('fs');
const formatHex = require(__dirname + 'formatHex');

// Load template and scan for placeholders
const template = fs.readFileSync(__dirname + 'template.css', { encoding: 'utf8' });
let newFile = template;
const matches = template.match(/{{.*}}/g);

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

    // Create an object to hold placeholder information
    let toAdd = {
        name: name,
        placeholder: placeholder,
        value: ''
    };

    // Does this match have a default specified? If so, add to object
    let defaultRegex = /default:(\S*)/g;
    let defaultCheck = placeholder.match(defaultRegex);
    if( defaultCheck != null ){
        let specifiedDefault = defaultRegex.exec(defaultCheck)[1];
        toAdd['default'] = specifiedDefault
    }

    // Add to placeholder list
    placeholders.push(toAdd);
});

// Prep prompt schema (see https://www.npmjs.com/package/prompt)
prompt.start();
let schema = {
    properties: {}
};
for( let placeholder in placeholders ){
    let val = placeholders[placeholder];

    // Prep data to save to schema
    let properties = {};

    // Does this placeholder have a default value set? If not, mark as required
    if( ! val.hasOwnProperty('default') ){
        properties.required = true;
        properties.description = val.name + ' (required)';
        properties.message = val.name + ' is required and must be a hex value!';
        properties.pattern = /^#?([\dabcdef]{3}$|[\dabcdef]{6}$)/;
    } else {
        properties.description = val.name + ' (default: ' + val.default + ')';
    }

    schema.properties[val.name] = properties;
}

prompt.get( schema, function(err, results){

    for( let placeholder in results ){
        let object = placeholders.filter(x => x.name == placeholder).pop();
        let val = formatHex( results[placeholder] );
        if( val === null || !val.length ){
            val = formatHex( results[object.default] );
        }
        newFile = newFile.replace( new RegExp(object.placeholder, 'g'), val );
    }

    // Write the file!
    fs.writeFileSync('login.css', newFile);
    console.log('File created at login.css');

});
