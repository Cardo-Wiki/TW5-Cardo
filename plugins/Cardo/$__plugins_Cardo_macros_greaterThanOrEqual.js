/*\
title: $/plugins/Cardo/macros/greaterThanOrEqual.js
type: application/javascript
module-type: macro

Compare two parameters and return a custom true/false value, or default "true"/"false", or special value "" if set to "--empty--", if left side is >= right side

\*/
(function(){
/*jslint node: true, browser: true */
/*global $tw: true */
"use strict";
/*
Information about this macro
*/
exports.name = "greaterThanOrEqual";

exports.params = [
   {name: "leftSide"},
   {name: "rightSide"},
   {name: "trueValue"},
   {name: "falseValue"}
];

/*
Run the macro
*/
exports.run = function(leftSide, rightSide, trueValue, falseValue) {
  
  if (leftSide == null || typeof(leftSide) == null || leftSide == "") {
    var leftSide="";
  }
  if (rightSide == null || typeof(rightSide) == null || rightSide == "") {
    var rightSide="";
  }
  if (trueValue == null || typeof(trueValue) == null || trueValue == "") {
    var trueValue="true";
  }
  if (falseValue == null || typeof(falseValue) == null || falseValue == "") {
    var falseValue="false";
  }  
  if (trueValue == "--empty--") { 
    trueValue="";
  }
  if (falseValue == "--empty--") { 
    falseValue="";
  }

  return ( parseInt(leftSide, 10) >= parseInt(rightSide, 10) ? trueValue : falseValue );
};

})();