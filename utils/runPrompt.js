let formatHex = require('./formatHex');
let fs = require('fs');

module.exports = (prompt, schema, placeholders, template) => {

    return new Promise((resolve, reject) => {
        prompt.get( schema, function(err, results){

            for( let placeholder in results ){
                let placeholderObject = placeholders.filter(x => x.name == placeholder.name).pop();

                let val = results[placeholder];

                if( placeholderObject.type == 'hex' ){
                    val = formatHex( results[placeholder] );
                    if( val === null || !val.length ){
                        val = formatHex( results[placeholderObject.default] );
                    }
                }

                template = template.replace( new RegExp(placeholderObject.placeholder.template, 'g'), val );
            }

            resolve(template);

        });
    });
}
