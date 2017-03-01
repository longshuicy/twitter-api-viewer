var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
 
// Connection URL 
var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  findDocuments(db,function(){ db.close(); });
  //insertDocuments(db,function(){ db.close(); });

});

//create collections
var createCapped = function(db,callback){
	db.createCollection("Twitter",{"capped":true,"size":10000,"max":5000},
	function(err,results){
		assert.equal(err,null);
		console.log("collection created.");
		callback();
	});
}
//insert
var insertDocuments = function(db,callback){
	var collection = db.collection('Twitter');
	collection.insertMany([
	{name:'abc',id:'12345',job:['abc','def']},{a:2},{a:3}],
	function(err,result){
		assert.equal(err,null);
		assert.equal(3,result.result.n);
		assert.equal(3,result.ops.length);
		console.log("Insert 3 docs into the document collection");
		callback(result);
	});
}

//updating
var updateDocuments = function(db,callback){
	var collection = db.collection('documents');
	collection.updateOne({a:2},{$set:{b:1}},function(err,result){
		assert.equal(err,null);
		assert.equal(1, result.result.n);
		console.log("update the doc with the field a equal to 2");
		callback(result);
	});
}

//delete
var deleteDocuments = function(db,callback){
	var collection = db.collection('documents');
	collection.deleteOne({a:3},function(err,result){
		assert.equal(err,null);
		assert.equal(1,result.result.n);
		console.log("remove the docs");
		callback(result);
	});
}

//find all
var findDocuments = function(db,callback){
	var collection = db.collection('Twitter');
	//collection.find({}).toArray(function(err,docs){
	collection.find({}).toArray(function(err,docs){
		assert.equal(err,null);
		console.log("found the following records");
		console.log(docs);
		callback(docs);
	});
}

//index a collection
var indexCollection = function(db,callback){
	db.collection('documents').createIndex(
	{a:1},
	null,
	function(err,results){
		console.log(results);
		callback();
	});
}