const types = require('./typeValidator');

module.exports = placeholders => {
    let schema = { properties: {} }

    // Make sure required values are first
    placeholders.sort( (a, b) => {
        if( ! a.hasDefault() && b.hasDefault() ){
            return -1
        } else if( a.hasDefault() && !b.hasDefault() ){
            return 1
        } else {
            return 0
        }
    })

    placeholders.forEach( placeholder => {

        // Prep data to save to schema
        let properties = {};

        // Does this placeholder have a default value set? If not, mark as required
        if( ! placeholder.hasDefault() ){
            properties.required = true;
            properties.description = placeholder.slug + ' (required)';
        } else {
            properties.description = placeholder.slug + ' (default: ' + placeholder.defaultValue + ')';
        }

        // Does this placeholder have a type set? If so, save validation
        if( placeholder.type ){
            properties.message = placeholder.slug + ' must be a ' + placeholder.type + '!';
            properties.pattern = types[placeholder.type];
        }

        schema.properties[placeholder.slug] = properties;
    })

    return schema;
}
