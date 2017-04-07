let formatHex = require('./formatHex');
let fs = require('fs');

module.exports = (prompt, schema, placeholders, template) => {

    return new Promise((resolve, reject) => {
        prompt.get( schema, function(err, results){

            for( let placeholder in results ){
                let object = placeholders.filter(x => x.name == placeholder).pop();
                let val = formatHex( results[placeholder] );
                if( val === null || !val.length ){
                    val = formatHex( results[object.default] );
                }
                template = template.replace( new RegExp(object.placeholder, 'g'), val );
            }

            resolve(template);

        });
    });
}
