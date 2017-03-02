var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var url = 'mongodb://localhost:27017/social_monitor';

//router.get('/', function(req, res, next) {
	MongoClient.connect(url, function (err, db) {
		if (err) {
					console.log('Unable to connect to the mongoDB server. Error:', err);
		} else {
					console.log('connected');
					db.collection('twitter', function(err, collection1) {
						collection1.find().toArray(function(err, items) {
							db.collection('facebook', function(err, collection) {
								collection.find().toArray(function(err, citems) {
									//res.send('pages/home', {title:'Express',itm:items,citm:citems});
									//console.log(items);
									//console.log(citems);
									});
								});
							});
						});
				}
	});
//});