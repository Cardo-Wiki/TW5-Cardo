/*\
title: $:/plugins/Cardo/filters/numberOfItems.js
type: application/javascript
module-type: filteroperator

Filter operator for returning a number of blank Tiddlers (actually a progression of numeric results... 1... 2... 3.. etc.)

This allows iterative loops:

  $list filter="[numberOfItems[4]]"
   $action-dosomething 4 times
   
\*/

(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Export our filter function
*/

exports.numberOfItems = function(source,operator,options) {
    var results = [];
    //source(function(tiddler,title) {
      if (operator.operand != "" && operator.operand !="0") { 
        var operandCount;
        for (operandCount = 0; operandCount < parseInt(operator.operand, 10); operandCount++) { 
          results.push(String(operandCount+1));
        } 
      }      
    //});
    return results;
};

})();  