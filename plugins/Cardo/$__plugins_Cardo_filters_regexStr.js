/*\
title: $:/plugins/Cardo/filters/regexStr.js
type: application/javascript
module-type: filteroperator

Filter operator for returning the results of a regexp on the input

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Export our filter function
*/
    
exports.regexStr = function(source,operator,options) {
    var results = [],
        fieldname = (operator.suffix || "title").toLowerCase(),
        regexpString, regexp, flags = "", match,
        getFieldString = function(tiddler,title) {
            if(tiddler) {
                return tiddler.getFieldString(fieldname);
            } else if(fieldname === "title") {
                return title;
            } else {
                return null;
            }
        };
    // Process flags and construct regexp
    regexpString = operator.operand;
    match = /^\(\?([gim]+)\)/.exec(regexpString);
    if(match) {
        flags = match[1];
        regexpString = regexpString.substr(match[0].length);
    } else {
        match = /\(\?([gim]+)\)$/.exec(regexpString);
        if(match) {
            flags = match[1];
            regexpString = regexpString.substr(0,regexpString.length - match[0].length);
        }
    }
    try {
        regexp = new RegExp(regexpString,flags);
    } catch(e) {
        return ["" + e];
    }
    // Process the incoming tiddlers
    if(operator.prefix === "!") {
        source(function(tiddler,title) {
            var text = getFieldString(tiddler,title);
            if(text !== null) {
                if(!regexp.exec(text)) {
                    results.push(regexp.exec(text)[0]);
                }
            }
        });
    } else {
        source(function(tiddler,title) {
            var text = getFieldString(tiddler,title);
            if(text !== null) {
                if(!!regexp.exec(text)) {
                    results.push(regexp.exec(text)[0]);
                }
            }
        });
    }
    return results;
};

})();
