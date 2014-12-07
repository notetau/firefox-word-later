var simple_storage = require("sdk/simple-storage");
// check initialized value?
if(simple_storage.storage.sort_type == null) {
	simple_storage.storage.sort_type = "sort_date";
}
if(simple_storage.storage.words == null) {
	simple_storage.storage.words = [];
}

function words_delete_element(w) {
	var len = simple_storage.storage.words.length;
	for(var i=0; i<len; i++) {
		var elem = JSON.stringify(simple_storage.storage.words[i]);
		if(elem == w) {
			simple_storage.storage.words.splice(i, 1);
			break;
		}
	}
}

function words_sort() {
	var type = simple_storage.storage.sort_type;
	var pred;
	if(type == "sort_date") {
		pred = function(a, b) {
			var A = new Date(a.date).getTime();
			var B = new Date(b.date).getTime();
			return A > B;
		};
	}
	else if(type == "sort_dict") {
		pred = function(a, b) {
			//TODO: now, think about only alphabet
			var A = a.word.toLowerCase();
			var B = b.word.toLowerCase();
			return A > B;
		};
	}
	else {
		console.log("invalid sort type");
		return;
	}

	simple_storage.storage.words.sort(pred);
}

var wordlaterShownFlag = false;
var wordlaterWorker = null;

function refresh_wordlater_list() {
	if( wordlaterWorker ) {
		wordlaterWorker.port.emit("refresh", JSON.stringify(simple_storage.storage.words));
	}
}

var sidebar = require("sdk/ui/sidebar").Sidebar({
	id: "word-later-list",
	title: "Word Later",
	url: require("sdk/self").data.url("sidebar.html"),

    onAttach: function (worker) {
		wordlaterShownFlag = true;
		wordlaterWorker = worker;
	},
	onDetach: function () {
		wordlaterShownFlag = false;
		wordlaterWorker = null;
	},

	onReady: function(worker) {
		refresh_wordlater_list();
		if(!simple_storage.storage.sort_type) {
			words_sort_by_date()
		}
		worker.port.emit("set-sort_type", simple_storage.storage.sort_type);

		worker.port.on("delete", function(item) {
			words_delete_element(item);
			refresh_wordlater_list();
			//console.log("add-on script delete");
		});

		worker.port.on("delete-all", function() {
			simple_storage.storage.words = [];
			refresh_wordlater_list();
			//console.log("add-on script delete all");
		});

		worker.port.on("sortby", function(type) {
			simple_storage.storage.sort_type = type;
			words_sort();
			refresh_wordlater_list();
		});
	},
});

var button = require("sdk/ui/button/action").ActionButton({
	id: "word-later",
	label: "word later",
	icon: {
		"16": "./wordlater_icon16.png",
		"32": "./wordlater_icon32.png",
		"64": "./wordlater_icon64.png",
	},
	onClick: function(state) {
		// SidebarToggle
		if (wordlaterShownFlag) { sidebar.hide(); }
		else { sidebar.show(); }
	},
});

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
	var elem = {
		word : text,
		url : "http://example.com/",
		date : new Date().toISOString(),
	};
	simple_storage.storage.words.push(elem);

	words_sort();
	refresh_wordlater_list();
	//console.log(text);
}
