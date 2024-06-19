/*\
title: $:/plugins/Cardo/filters/fieldOrEmpty.js
type: application/javascript
module-type: filteroperator

Filter operator for checking for a field but does nothing (passes everything through for the next filter) if looking for an empty field

This allows:

  $set name="aFieldValueToLookFor" value=""
  $list filter="[fieldOrEmpty:fieldName[aFieldValueToLookFor]]"
  
...without breaking if the variable is empty

\*/

(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Export our filter function
*/
exports.fieldOrEmpty = function(source,operator,options) {
  var results = [],
    fieldname = (operator.suffix || operator.operator || "title").toLowerCase();
  
  if (operator.operand != "" && operator.operand != "-SKIP-") {
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
					if(text !== null && text === operator.operand) {
						results.push(title);
					}
				}
			});
		}
	}
	return results;
    // If we're skipping this filter
    } else {
      // return a full set of previous titles so that everything is untouched (passes through this filter)
      source(function(tiddler,title) {
        results.push(title);
      }); 
      return results;
    }  
};

})();
