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

var RandomNumberWidget = function(parseTreeNode,options) {
    var rndNum = Math.floor((Math.random() * 999999999) + 1);
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
RandomNumberWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
RandomNumberWidget.prototype.render = function(parent,nextSibling) {
	this.parentDomNode = parent;
	this.computeAttributes();
	this.execute();
	var rndNumNode = this.document.createTextNode(rndNum);
	parent.insertBefore(rndNumNode,nextSibling);
	this.domNodes.push(rndNumNode);
};

/*
Compute the internal state of the widget
*/
RandomNumberWidget.prototype.execute = function() {
    this.variableName = this.getAttribute("variable");
    this.setVariable(this.parseTreeNode.variableName,this.rndNum);
};

/*
Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
*/
RandomNumberWidget.prototype.refresh = function(changedTiddlers) {
	var changedAttributes = this.computeAttributes();
	if(changedAttributes.rndNum) {
		this.refreshSelf();
		return true;
	} else {
		return false;	
	}
};

exports.randomNumber = RandomNumberWidget;

})();
