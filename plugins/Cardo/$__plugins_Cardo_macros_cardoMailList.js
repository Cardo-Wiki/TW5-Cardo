/*\
title: $:/plugins/Cardo/macros/cardoMailList.js
type: application/javascript
module-type: macro

Macro to call an IMAP Proxy URL through AJAX, and parse the JSON result into a list of emails which can be opened as Tiddlers

<<cardoMailList url:"properurl"....>>

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Information about this macro
*/

exports.name = "cardoMailList";

exports.params = [
  {name: "url"},
  {name: "maxEmails"},
  {name: "onlyNew"},
  {name: "onlyFlagged"},
  {name: "groupBy"},
  {name: "title"}
];

/*
Run the macro
*/
exports.run = function(url, maxEmails, onlyNew, onlyFlagged, groupBy, title) {

  
  function getAJAXJSONResponse(url) {
      var xmlhttp;
      var AJAXresponse = "";

      if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
      } else {
        // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
      }

      xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
          AJAXresponse = xmlhttp.responseText;
        }
      }

      xmlhttp.open("GET",url,false);
      xmlhttp.send();

      // Return the response as a JSON string
      if (AJAXresponse == "OK" || AJAXresponse.substring(0,3) == "Err") {
//DEBUG:
//alert("1: " + AJAXresponse);
        return AJAXresponse;
      } else {
//DEBUG:
//alert("2: " + AJAXresponse);
        return JSON.parse(AJAXresponse);
      }
  }; //getJSONResponse(url)
  
  function getMessageList(url, onlyNew, onlyFlagged, maxEmails, groupBy, title) {
      //Get list of messages (as a JSON string from the node.js server running dGSDMailServer.js)
      var mailList = getAJAXJSONResponse(url);
      if (String(mailList).substring(0,3) == "Err") {
        displayMessage("Can't get email list - "+mailList);
      } else {  
        
        var wikifyThis = "";
        wikifyThis += "<div class='cardoList'>";
        if (title != "") {
          wikifyThis += "<div class='cardoList title'>" + title + "</div>";
        } 

   		// De-JSONify the mail list, consisting of [{"UID":"xxxx","subject":"xxx"},{"UID":"xxxx","subject":"xxx"},...]
        var mailListArray = [];
        var messages = mailList.messageList.results;
        var readStatus = false;
        var flaggedStatus = false;
        var repliedStatus = false;
        var forwardedStatus = false;
        var fromName = "";
        var fromAddress = "";  
//DEBUG
//alert("Got messages, len: " + messages.length + " ON: " + onlyNew + " OF: " + onlyFlagged);
        for (var i = 0, len = messages.length; i < len; i++) {         
          var message = messages[i];
          (String(message.flags).indexOf("Seen") != -1) ? readStatus = true : readStatus = false;
          (String(message.flags).indexOf("Flagged") != -1) ? flaggedStatus = true : flaggedStatus = false;
          (!message.from.name || message.from.name === "" || message.from.name === "undefined") ? fromName = "" : fromName = message.from.name;
          (!message.from.address|| message.from.address === "" || message.from.address=== "undefined") ? fromAddress = "" : fromAddress = message.from.address;

          // Check if we're only looking for certain messages (new, flagged, etc.)
          if ((onlyNew == "true" && readStatus == false) || (onlyFlagged == "true" && flaggedStatus == true) || (onlyNew == "false" && onlyFlagged == "false") ) {
//alert("Adding " + message.subject); 
            // for each flag in "flags", set an appropriate status
            (String(message.flags).indexOf("\Answered") != -1) ? repliedStatus = true : repliedStatus = false;
            (String(message.flags).indexOf("\$Forwarded") != -1) ? forwardedStatus = true : forwardedStatus = false;
            //mailListArray.push({ UID: message.UID, subject: message.subject, readStatus: readStatus, flaggedStatus: flaggedStatus, repliedStatus: repliedStatus, forwardedStatus: forwardedStatus, fromName: fromName, fromAddress: fromAddress, date: message.date, bodySnippet: message.body});
            
            message.body = "UID: " + message.UID + " (We haven't got the message yet...)";
            message.body = message.body.replace(/[&"'\<\>]/g, function(c) {
  switch (c) {
  case "&":
    return "&amp;";
  case "'":
    return "&#39;";
  case '"':
    return "&quot;";
  case "<":
    return "&lt;";
  case ">":
    return "&gt;";
  }

});
            
            //Clean up the subject line
            message.subject = message.subject.replace(/(\r\n|\n|\r)/gm," ").replace(/[\[\]\|<>{}]/gm,'').replace(/\.\w/gm,". ");
            // Generate the list string
            wikifyThis += "<div class='cardoList.listItem'>";
            // Checkbox to mark read or not
            if (readStatus == true) {
              wikifyThis += "<<toggleEmailUnread messageUID:'" + message.UID + "'>>";
            } else {
              wikifyThis += "<<toggleEmailRead messageUID:'" + message.UID + "'>>";
            }              
            // Star if flagged
            if (flaggedStatus == true) {
              wikifyThis += "<<toggleEmailUnstarred messageUID:'" + message.UID + "'>>";
            } else {
              wikifyThis += "<<toggleEmailStarred messageUID:'" + message.UID + "'>>";
            }               
            //Arrow if replied, forwarded (or hollow if not)
            if (repliedStatus == true) { wikifyThis += "<span class='emailListReplied'>{{$:/plugins/Cardo/images/reply}}</span>"; }
            if (forwardedStatus == true) { wikifyThis += "<span class='emailListReplied'>{{$:/plugins/Cardo/images/reply}}</span>"; }
            // Delete button
            wikifyThis += "<<deleteEmailXButton messageUID:'" + message.UID + "'>>";
            // Date sent
            wikifyThis += "<span class='dueDate'>" + message.date + "</span>";
            // Subject, bold if unread
            wikifyThis += "<span class='cardoListItemName'>";
            if (readStatus == false) { wikifyThis += "''"; }
            wikifyThis += "<$button class='tc-tiddlylink'><$action-sendmessage $message='tm-new-tiddler' cardo-emailuid='" + message.UID + "' title='" + decodeURIComponent(message.subject) + "' cardo-type='email' cardo-emailbody='" + message.body + "'/>" + decodeURIComponent(message.subject) + "</$button>";
            if (readStatus == false) { wikifyThis += "''"; }
			wikifyThis += "</span><br>";
            // From "Name (address)"
            wikifyThis += "<span class='emailListFromName'>" + message.from.name + "</span><span class='emailListFromAddress'> (" + message.from.address + ")</span>";
            //Transclude the body for preview
            wikifyThis += "<div class='tooltip itemPreview'>{{$:/plugins/Cardo/images/paper}}<span class='tooltiptext'>" + message.body + "</span></div>";
            wikifyThis += "</div>";

          }
      }
                
      wikifyThis += "</div>"
      //wikifyThis = $tw.wiki.parseText("text/vnd.tiddlywiki",wikifyThis,"inline");  
      return wikifyThis;
        
      }  
  }; //getMessageList
  
  //FOR DEBUG ONLY:
  function prettyJSON(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
  };
  
  // Parse the URL for server, login, password, # of messages, etc. and run
  var listify;
  var JSONlist;
  listify = getMessageList(url, onlyNew, onlyFlagged, maxEmails, groupBy, title);
  //listify = prettyJSON(JSONlist);
  return listify; //"LISTIFY:<p>&nbsp;<p>" + listify + "" + "<p>&nbsp;<p>JSONLIST:<p>&nbsp;<p>" + JSONlist;
}; //loadJSONbyAJAX macro
  
})();
