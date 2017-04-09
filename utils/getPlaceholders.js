let Placeholder = require( './placeholder' )

module.exports = matches => {

    let placeholders = [];

    matches.forEach( function(placeholder){

        // Save the name of the placeholder
        let nameRegex = /{{\s?(\S*)\s?.*}}/g;
        let name = nameRegex.exec(placeholder)[1];

        // Skip if we've already saved this placeholder
        if( placeholders.filter( function(val){ return val.name == name; } ).length ){
            return;
        }

        let template = placeholder.replace( /({{\s+\S*\s*?)(.*?)(\s}})/g, '$1$3' )

        // Does this match have a default specified? If so, add to object
        let defaultRegex = /default:(\S*)/g;
        let defaultCheck = placeholder.match(defaultRegex);
        let defaultValue = undefined
        if( defaultCheck != null ){
            let specifiedDefault = defaultRegex.exec(defaultCheck)[1];
            defaultValue = specifiedDefault
        }

        // Does this match have a type specified? If so, add
        let typeRegex = /type:(\S*)/g;
        let typeCheck = placeholder.match(typeRegex);
        let type = 'string'
        if( typeCheck != null ){
            let specifiedType = typeRegex.exec(typeCheck)[1];
            type = specifiedType;
        }

        // Add to placeholder list
        placeholders.push( new Placeholder(name, template, defaultValue, type) );
    });

    return placeholders;

}
