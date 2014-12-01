var contextMenu = require("sdk/context-menu");
var menuItem = contextMenu.Item({
	label: "WORD LATER",
	context: contextMenu.SelectionContext(),
	contentScript:
	'self.on("context", function () {' +
	'  var text = window.getSelection().toString();' +
	'  if (text.length > 20) text = text.substr(0, 20) + "...";' +
	'  return "Add word-later :" + text;' +
	'});' +
	'self.on("click", function() {' +
	'	var text = window.getSelection().toString();' +
	'	self.postMessage(text);' +
	'});',
	onMessage: wordlaterAddWord
});

function wordlaterAddWord(text) {
	console.log(selectionText);
}

var wordlaterShownFlag = false;

var sidebar = require("sdk/ui/sidebar").Sidebar({
	id: "word-later-list",
	title: "Word Later",
	url: require("sdk/self").data.url("sidebar.html"),

    onAttach: function (worker) {
		wordlaterShownFlag = true;
	},
	onDetach: function () {
		wordlaterShownFlag = false;
	},
});

function wordlaterSidebarToggle() {
	if (wordlaterShownFlag) { sidebar.hide(); }
	else { sidebar.show(); }
}

var button = require("sdk/ui/button/action").ActionButton({
	id: "word-later",
	label: "word later",
	icon: {
		"16": "./icon-16.png",
		"32": "./icon-32.png",
		"64": "./icon-64.png",
	},
	onClick: handleWordLaterClick
});

function handleWordLaterClick(state) {
	wordlaterSidebarToggle();
}
