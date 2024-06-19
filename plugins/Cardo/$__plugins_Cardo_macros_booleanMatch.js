/*\
title: $/plugins/Cardo/macros/booleanMatch.js
type: application/javascript
module-type: macro

Compare two parameters and return a custom true/false value, or default "true"/"false", or special value "" if set to "--empty--", if the sides (!)match

\*/
(function(){
/*jslint node: true, browser: true */
/*global $tw: true */
"use strict";
/*
Information about this macro
*/
exports.name = "booleanMatch";

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
  
  if (leftSide == null || typeof(leftSide) == null || leftSide == "" || leftSide == "--empty--") {
    var leftSide="";
  }
  if (rightSide == null || typeof(rightSide) == null || rightSide == "" || rightSide == "--empty--") {
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

  return ( leftSide.toString() == rightSide.toString() ? trueValue : falseValue );
};

})();