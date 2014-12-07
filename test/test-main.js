var test_model =
[
	{word:"*********", url:"https://example.com",           date:"2014-12-05T12:21:06.178Z"},
	{word:"A",         url:"https://example.com",           date:"2014-12-05T12:21:36.826Z"},
	{word:"sizen",     url:"https://example.com",           date:"2014-12-05T12:21:37.826Z"},
	{word:"pneumonoultramicroscopicsilicovolcanoconiosis longest word",
	                   url:"https://example.com",           date:"2014-12-05T12:21:36.856Z"},
	{word:"gold",      url:"https://example.com",           date:"2014-12-05T12:22:36.826Z"},
	{word:"exchagen", url:"https://example.com/hello.html", date:"2014-12-06T12:21:36.826Z"},
	{word:"polyfill", url:"https://example.com/hello.html", date:"2014-12-05T12:30:36.826Z"},
	{word:"wqwezdsf", url:"https://dammy.com/",             date:"2014-12-05T12:41:36.826Z"},
	{word:
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mollis lectus at facilisis pellentesque. Sed pulvinar velit nisi, vitae blandit metus euismod blandit. Nunc sit amet sem elit. Nam vel gravida nibh. Quisque mattis enim et lacus commodo auctor. Fusce dictum ac mauris non cursus. Nunc sed nulla sit amet enim pulvinar congue ac nec magna. Praesent id porttitor lorem. "
	,                 url:"http://negimemo.net/2364",  date:"2014-16-05T12:21:36.826Z"},
	{word:"wqwezdsf", url:"https://dammy.com",         date:"2014-11-05T12:21:36.826Z"},
	{word:
	"何でもかでも当時を発表論もよくそんなお話ででくらいをしてしまえなとも堕落つかならだて、いろいろにも出ますななけれた。個人を起しです気は単にほかがけっしてだないた。何しろ木下君が招待知人どう融和としです人その胸私か意味がという肝思索ででますたば、そんなほかも僕か大牢自我にありて、木下さんののが個人のそれに必ずしもお答弁となって私個人を実ふりをするようにけっしておお話しに結びたないて、けっしてもし徹底になるならていあっはずが上っなな。すなわちしかしご通りより立っのはそれだけ変と過ぎますて、同じ人格をも落ちたらととして腹の中をしといですです。"
	,                       url:"http://negimemo.net/2364", date:"2014-12-05T12:29:36.826Z"},
	{word:"wqwezdsf feafe", url:"https://dammy.com/",       date:"2014-12-05T15:21:36.826Z"},
];

var main = require("./main");

exports["test main"] = function(assert) {
  assert.pass("Unit test running!");
};

exports["test main async"] = function(assert, done) {
  assert.pass("async Unit test running!");
  done();
};

require("sdk/test").run(exports);
