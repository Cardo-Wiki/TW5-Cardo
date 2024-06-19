/*\
title: $:/core/modules/widgets/text.js
type: application/javascript
module-type: widget

Text node widget

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var ConcatenateWidget = function(parseTreeNode,options) {
    var rndNum = Math.floor((Math.random() * 999999999) + 1);
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
ConcatenateWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
ConcatenateWidget.prototype.render = function(parent,nextSibling) {
    var concatenatedString = "";
	this.parentDomNode = parent;
	this.computeAttributes();
	this.execute(concatenatedString);
	parent.insertBefore(concatenatedString,nextSibling);
	this.domNodes.push(concatenatedString);
};

/*
Compute the internal state of the widget
*/
ConcatenateWidget.prototype.execute = function(concatenatedString) {
    // Parse variables
    var self = this;
    $tw.utils.each(this.attributes,function(key) {
        if(key.charAt(0) !== "$") {
            //self.setVariable(key,val);
            concatenatedString += key;
        }
    });
    return concatenatedString;
};

/*
Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
*/
ConcatenateWidget.prototype.refresh = function(changedTiddlers) {
	var changedAttributes = this.computeAttributes();
	if(changedAttributes.rndNum) {
		this.refreshSelf();
		return true;
	} else {
		return false;	
	}
};

exports.concatenate = ConcatenateWidget;

})();
