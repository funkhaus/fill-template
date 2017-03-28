#!/usr/bin/env node
"use strict"

const prompt = require('prompt');
const fs = require('fs');

// Load template and scan for placeholders
const file = fs.readFileSync('./template.css', { encoding: 'utf8' });
