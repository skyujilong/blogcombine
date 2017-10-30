var startTime = +new Date;
var utils = require('js-combine-pack');
var tool = utils.tool;
var toolOptions = tool.config;
var findFiles = tool.findFiles;
var findJsAllImport = tool.findJsAllImport;
var getAllJsDeps = tool.getAllJsDeps;
var qs = require('querystring');
var u = require('url');
var fs = require('fs');
var path = require('path');
//var console = require('console');
var byline = tool.lineStream;
var http = require('http');



http.createServer(function(req,res){
	if(req.url === '/favicon.ico') {
		res.end();
		return;
	}
	var query = qs.parse(u.parse(req.url).query);
	var product = query.product;
	var pageid = query.pageid;
	var basepath = path.resolve(__dirname,'../'+product);
	var confPath = '/conf/' + pageid + '.dev.js';
	var srcUrl = basepath + confPath;

	var model = query.model;
	var time = Date.now();
	toolOptions.basedir = basepath;
	if ('mini' == model) {
		var hasToFilter = 'blog7' == product;

		var filter = function(leaf, cb){
			if (-1 !== leaf.file.indexOf('sinaEditor')) {
				if (leaf.file.indexOf('editor.js')) {
					cb(leaf.file, leaf);
				}
				return false;
			}
		};

		getAllJsDeps(basepath, confPath, function(files){
			time = Date.now() - time;
			var content = ['/* Time spend time '+time+' ms*/','function $import(){};'].join('\n');
			for (var i = 0, len = files.length; i < len; i++) {
				var file = files[i];
				var url = 'http://'+req.headers.host + '/' + product + file;
				content += ('document.write(\'<scr\'+\'ipt type="text/javascript" src="'+url+'"></s\'+\'cript>\');\n');
			}
			res.end(content);
//		}, null, function(leaf, cb){
//			if (-1 !== leaf.file.indexOf('sinaEditor')) {
//				if (leaf.file.indexOf('editor.js')) {
//					cb(leaf.file, leaf);
//				}
//				return false;
//			}
		});

	} else {
		var jsList = findFiles.allFilesList(basepath);
		var jsListCon = findFiles.allFilesCon(jsList, basepath);
		findJsAllImport(srcUrl, jsListCon, function(data){
			res.writeHeader(200,{
				'Content-Type':'application/javascript'
			});
			res.end(data);	
		});
	}
}).listen('8080','127.0.0.1');
