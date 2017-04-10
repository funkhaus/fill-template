let Placeholder = require( './placeholder' )

module.exports = template => {

    // Build list of matches from Mustache elements in template
    const matches = template.match(/{{.*?}}/g);

    let placeholders = [];

    matches.forEach( function(mustache){

        // Save the slug of the element
        let slugRegex = /{{\s?(\S*)\s?.*?}}/g;
        let slug = slugRegex.exec(mustache)[1];
        console.log(slug)

        // Skip if we've already saved this slug
        if( placeholders.filter( function(val){ return val.slug == slug; } ).length ){
            return;
        }

        // Does this match have a default specified? If so, add to object
        let defaultRegex = /default:(\S*)/g;
        let defaultCheck = mustache.match(defaultRegex);
        let defaultValue = undefined
        if( defaultCheck != null ){
            let specifiedDefault = defaultRegex.exec(defaultCheck)[1];
            defaultValue = specifiedDefault
        }

        // Does this match have a type specified? If so, set it up
        let typeRegex = /type:(\S*)/g;
        let typeCheck = mustache.match(typeRegex);
        let type = 'string'
        if( typeCheck != null ){
            let specifiedType = typeRegex.exec(typeCheck)[1];
            type = specifiedType;
        }

        // Add to placeholder list
        placeholders.push( new Placeholder(slug, defaultValue, type) );
    });

    // Make sure placeholders with defaults have the correct types set
    placeholders.forEach(placeholder => {
        if( placeholder.hasDefault() ){

            let defaultValue = placeholders.find(x => { return x.slug == placeholder.defaultValue })

            // Make sure type matches default
            placeholder.type = defaultValue.type

        }
    })

    return placeholders;

}
