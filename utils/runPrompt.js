let formatHex = require('./formatHex');
let fs = require('fs');

module.exports = (prompt, schema, placeholders, template) => {

    return new Promise((resolve, reject) => {
        prompt.get( schema, function(err, results){

            Object.keys(results).forEach( result => {
                let placeholderObject = placeholders.find( x => { return x.slug == result } )

                let val = results[result]

                if( !val.length && placeholderObject.hasDefault() ){
                    let key = placeholders.find( x => { return x.slug == placeholderObject.defaultValue } ).slug
                    val = results[key]
                }

                if( placeholderObject.type == 'hex' ){
                    val = formatHex( val );
                    if( val === null || !val.length ){
                        val = formatHex( results[placeholderObject.default] );
                    }
                }

                template = template.replace( new RegExp(placeholderObject.getTemplate(), 'g'), val );
            })

            resolve(template);

        });
    });
}
