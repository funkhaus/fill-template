const types = require('./typeValidator.js');

module.exports = placeholders => {
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
        } else {
            properties.description = val.name + ' (default: ' + val.default + ')';
        }

        // Does this placeholder have a type set? If so, save validation
        if( val.hasOwnProperty('type') ){
            properties.message = val.name + ' must be a ' + val.type + '!';
            properties.pattern = types[val.type];
        }

        schema.properties[val.name] = properties;
    }

    return schema;
}
