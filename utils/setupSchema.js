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
            properties.message = val.name + ' is required and must be a hex value!';
            properties.pattern = /^#?([\dabcdef]{3}$|[\dabcdef]{6}$)/;
        } else {
            properties.description = val.name + ' (default: ' + val.default + ')';
        }

        schema.properties[val.name] = properties;
    }

    return schema;
}
