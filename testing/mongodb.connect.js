var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var url = 'mongodb://localhost:27017/social_monitor';
// Use connect method to connect to the Server 

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  //removeCollection(db,'facebook',function(){
	findDocuments(db,'facebook',function(){ db.close(); });
  //});

});

//find all
var findDocuments = function(db,collection_name, callback){
	var collection = db.collection(collection_name);
	//collection.find({}).toArray(function(err,docs){
	collection.find({}).toArray(function(err,docs){
		assert.equal(err,null);
		console.log("found the following records in collection: " + collection_name);
		console.log(docs);
		callback(docs);
	});
}

//remove all
var removeCollection = function(db,collection_name,callback){
	var collection = db.collection(collection_name);
	collection.remove({},function(err,result){
		assert.equal(err,null);
		console.log("remove the whole collection");
		callback(result);
	});
}


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
	var collection = db.collection('twitter');
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