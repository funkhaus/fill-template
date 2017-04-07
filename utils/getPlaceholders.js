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

        // Create an object to hold placeholder information
        let toAdd = {
            name: name,
            placeholder: placeholder.replace( /({{\s+\S*\s*?)(.*?)(\s}})/g, '$1$3' ),
            value: ''
        };

        // Does this match have a default specified? If so, add to object
        let defaultRegex = /default:(\S*)/g;
        let defaultCheck = placeholder.match(defaultRegex);
        if( defaultCheck != null ){
            let specifiedDefault = defaultRegex.exec(defaultCheck)[1];
            toAdd['default'] = specifiedDefault
        }

        // Does this match have a type specified? If so, add
        let typeRegex = /type:(\S*)/g;
        let typeCheck = placeholder.match(typeRegex);
        if( typeCheck != null ){
            let specifiedType = typeRegex.exec(typeCheck)[1];
            toAdd['type'] = specifiedType;
        } else {
            toAdd['type'] = 'string';
        }

        // Add to placeholder list
        placeholders.push(toAdd);
    });

    return placeholders;

}
