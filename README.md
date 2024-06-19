# TW5-Cardo

This is a work in progress.

The idea to this project startet on https://talk.tiddlywiki.org/t/core-update-of-cardo-plugin-results-in-javascript-error/9833. Because when I updated this Cardo version https://dyumnin.com/Cardo.html from Core 5.1.19 to Core 5.3.3 I ran into a Javascript Error, which could be easily fixed by

replacing:

results.push(regexp.exec(text));

with

results.push(regexp.exec(text)[0]);

Unfortunately the Community has reason to assume that the Creator of the Cardo Pluggin died in 2019. So we would like to maintain this plugin.

2024-06-19
So far it is an empty TiddlyWiki 5.3.3 with the imported fixed Cardo Plugin from https://dyumnin.com/Cardo.html plus imported tiddlers for demonstration.

Known Problems:
* With Cardo activated the import doesn't work anymore