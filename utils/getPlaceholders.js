module.exports = matches => {

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

    return placeholders;

}
