const types = require('./typeValidator');

module.exports = placeholders => {
    let schema = { properties: {} }

    placeholders.forEach( val => {

        // Prep data to save to schema
        let properties = {};

        // Does this placeholder have a default value set? If not, mark as required
        if( ! val.hasDefault() ){
            properties.required = true;
            properties.description = val.slug + ' (required)';
        } else {
            properties.description = val.slug + ' (default: ' + val.defaultValue + ')';
        }

        // Does this placeholder have a type set? If so, save validation
        if( val.type ){
            properties.message = val.slug + ' must be a ' + val.type + '!';
            properties.pattern = types[val.type];
        }

        schema.properties[val.slug] = properties;
    })

    return schema;
}
