var test_model =
[
	{word:"*********", url:"https://example.com", date:new Date().toISOString()},
	{word:"A", url:"https://example.com", date:new Date().toISOString()},
	{word:"sizen", url:"https://example.com", date:new Date().toISOString()},
	{word:"pneumonoultramicroscopicsilicovolcanoconiosis longest word", url:"https://example.com", date:new Date().toISOString()},
	{word:"gold", url:"https://example.com", date:new Date().toISOString()},
	{word:"exchagen", url:"https://example.com/hello.html", date:new Date().toISOString()},
	{word:"polyfill", url:"https://example.com/hello.html", date:new Date().toISOString()},
	{word:"wqwezdsf", url:"https://dammy.com/", date:new Date().toISOString()},
	{word:
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mollis lectus at facilisis pellentesque. Sed pulvinar velit nisi, vitae blandit metus euismod blandit. Nunc sit amet sem elit. Nam vel gravida nibh. Quisque mattis enim et lacus commodo auctor. Fusce dictum ac mauris non cursus. Nunc sed nulla sit amet enim pulvinar congue ac nec magna. Praesent id porttitor lorem. "
	, url:"http://negimemo.net/2364", date:new Date().toISOString()},
	{word:"wqwezdsf", url:"https://dammy.com", date:new Date().toISOString()},
	{word:
	"何でもかでも当時を発表論もよくそんなお話ででくらいをしてしまえなとも堕落つかならだて、いろいろにも出ますななけれた。個人を起しです気は単にほかがけっしてだないた。何しろ木下君が招待知人どう融和としです人その胸私か意味がという肝思索ででますたば、そんなほかも僕か大牢自我にありて、木下さんののが個人のそれに必ずしもお答弁となって私個人を実ふりをするようにけっしておお話しに結びたないて、けっしてもし徹底になるならていあっはずが上っなな。すなわちしかしご通りより立っのはそれだけ変と過ぎますて、同じ人格をも落ちたらととして腹の中をしといですです。"
	, url:"http://negimemo.net/2364", date:new Date().toISOString()},
	{word:"wqwezdsf feafe", url:"https://dammy.com/", date:new Date().toISOString()},
];

var simple_storage = require("sdk/simple-storage");
simple_storage.storage.words = test_model;


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
	},
});

var button = require("sdk/ui/button/action").ActionButton({
	id: "word-later",
	label: "word later",
	icon: {
		"16": "./icon-16.png",
		"32": "./icon-32.png",
		"64": "./icon-64.png",
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
	refresh_wordlater_list();
	//console.log(text);
}
