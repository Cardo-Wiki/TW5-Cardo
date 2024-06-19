/*\
title: $/plugins/Cardo/macros/reminderModal.js
type: application/javascript
module-type: macro

Raise a Tiddler in a Modal window by triggering this macro. 

\*/
(function(){
/*jslint node: true, browser: true */
/*global $tw: true */
"use strict";
/*
Information about this macro
*/
exports.name = "reminderModal";

exports.params = [ 
      {name: "reminderName"},
      {name: "reminderText"}
                 ];

/*
Run the macro
*/
exports.run = function(reminderName, reminderText) {

    $tw.rootWidget.dispatchEvent({
        type: "tm-modal",
        param: "$:/plugins/Cardo/ui/ReminderModal",
      	paramObject: { reminderName: reminderName,
                       reminderText: reminderText }
    });
  
  return;
};
  
})();