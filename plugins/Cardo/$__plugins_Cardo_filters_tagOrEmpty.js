/*\
title: $:/plugins/Cardo/filters/tagOrEmpty.js
type: application/javascript
module-type: filteroperator

Filter operator for checking for the presence of a tag but does nothing (passes everything through for the next filter) if looking for an empty tag

This allows:

  $set name="anotherTagToLookFor" value=""
  $list filter="[tag[OneTagToLookFor]] [tag<anotherTagToLookFor>]"
  
...without breaking if the tag name isn't set

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Export our filter function
*/
exports.tagOrEmpty = function(source,operator,options) {
   
  var results = [];
  if (operator.operand != "") {
	if (operator.prefix === "!") {
		source(function(tiddler,title) {
			if(tiddler && !tiddler.hasTag(operator.operand)) {
				results.push(title);
			}
		});
	} else {
		source(function(tiddler,title) {
			if(tiddler && tiddler.hasTag(operator.operand)) {
				results.push(title);
			}
		});
		results = options.wiki.sortByList(results,operator.operand);
	}
	return results;
  } else {
      // Pass everything through to the next step - this filter is being asked to do nothing!
      source(function(tiddler,title) {
        results.push(title);
      }); 
    results = options.wiki.sortByList(results,operator.operand);
    return results;
  }
};

})();
