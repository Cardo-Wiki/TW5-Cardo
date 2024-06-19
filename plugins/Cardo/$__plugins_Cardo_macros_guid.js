/*\
title: $/plugins/Cardo/macros/guid.js
type: application/javascript
module-type: macro

Spit out an RFC4122 version 4 compliant GUID based on time and 4 random numbers

\*/
(function(){
/*jslint node: true, browser: true */
/*global $tw: true */
"use strict";
/*
Information about this macro
*/
exports.name = "guid";

exports.params = [];

/*
Run the macro
*/
exports.run = function() {
  
 /**
 * Fast UUID generator, RFC4122 version 4 compliant.
 * @author Jeff Ward (jcward.com) and others.
 * @license MIT license
 * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
 **/
  var d = new Date().getTime();
  var crypt = window.crypto || window.msCrypto;
  if(window.performance && typeof window.performance.now === "function"){
    d += performance.now(); //use high-precision timer if available
  }  
  var lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
  function generate() {
    if(crypt && crypt.getRandomValues){
      var dvals = new Uint32Array(4);
      crypt.getRandomValues(dvals);
      var d0 = d+dvals[0];
      var d1 = d+dvals[1];
      var d2 = d+dvals[2];
      var d3 = d+dvals[3];
      return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+    lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];      
    } else {
      var d0 = d+Math.random()*0x100000000>>>0;
      var d1 = d+Math.random()*0x100000000>>>0;
      var d2 = d+Math.random()*0x100000000>>>0;
      var d3 = d+Math.random()*0x100000000>>>0;
    }
    return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
    lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
    lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
    lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
  }
  return generate();
};
  
})();