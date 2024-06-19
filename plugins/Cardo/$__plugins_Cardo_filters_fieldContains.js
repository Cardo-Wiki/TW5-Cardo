/*\
title: $:/plugins/Cardo/filters/fieldContains.js
type: application/javascript
module-type: filteroperator

Filter operator for seeing if a field contains a string

\*/ 
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Export our filter function
*/
exports.fieldContains = function(source,operator,options) {
	var results = [],
		fieldname = (operator.suffix || operator.operator || "title"); //.toLowerCase();
  if(operator.prefix === "!") {
		if(operator.regexp) {
			source(function(tiddler,title) {
				if(tiddler) {
					var text = tiddler.getFieldString(fieldname);              
					if(text !== null && !operator.regexp.exec(text)) {                     
						results.push(title);
					}
				} else {     
					results.push(title);
				}
			});
		} else {
			source(function(tiddler,title) {
				if(tiddler) {
					var text = tiddler.getFieldString(fieldname);
					if(text !== null && text !== operator.operand) {                   
						results.push(title);
					}
				} else { 
					results.push(title);
				}
			});
		}
	} else {
		if(operator.regexp) {
			source(function(tiddler,title) {
				if(tiddler) {
					var text = tiddler.getFieldString(fieldname);               
					if(text !== null && !!operator.regexp.exec(text)) {                        
						results.push(title);
					}
				}
			});
		} else {
			source(function(tiddler,title) {
				if(tiddler) {
					var text = tiddler.getFieldString(fieldname);                 
					//if(text !== null && (text.includes(operator.operand) || text.indexOf(operator.operand) != -1) ) {
                    if(text !== null && text.indexOf(operator.operand) != -1) {
						results.push(title);
					}
				}
			});
		}
	}
    return results;
};

})();
