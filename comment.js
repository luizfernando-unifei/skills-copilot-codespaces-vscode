//create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var comments = [];
var commentsPath = path.resolve(__dirname, 'comments.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));