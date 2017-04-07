"use strict";

module.exports = function(val){

    // Make sure we fall into correct format (see Readme under "How It Works")
    let re = /^#?([\dabcdef]{3}$|[\dabcdef]{6}$)/gm;
    let matches = re.exec(val);

    // Extend to 6 characters if only 3
    if( matches ){
        matches = matches[1];
        if( matches.length == 3 ){
            matches =
                matches.charAt(0) +
                matches.charAt(0) +
                matches.charAt(1) +
                matches.charAt(1) +
                matches.charAt(2) +
                matches.charAt(2);
        }

        matches = '#' + matches;
    }

    return matches;

};
