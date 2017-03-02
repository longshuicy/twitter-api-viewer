// connect to database and insert documents
var storeJson = function(collection_name,arrayOfJson){

	var MongoClient = require('mongodb').MongoClient, assert = require('assert');
	var url = 'mongodb://localhost:27017/social_monitor';
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  console.log("Connected correctly to server");
	  insertDocuments(db,collection_name, function(){ db.close(); });
	});

	//insert
	var insertDocuments = function(db,collection_name,callback){
		var collection = db.collection(collection_name);
		collection.insertMany(arrayOfJson, function(err,result){
						assert.equal(err,null);
						console.log("Insert " +result.ops.length+" docs into the "+collection_name+" collection");
						callback(result);
					 });
	}
}

/*function readJson(){
	var MongoClient = require('mongodb').MongoClient, assert = require('assert');
	var url = 'mongodb://localhost:27017/social_monitor';
	var val = MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  console.log("Connected correctly to server");
	  var val = findDocuments(db,function(){ db.close(); });
	  return val;//this call back means execute close database inside of the findDocuments?
	});
	
	//var temp;
	
	function findDocuments(db,callback){
		var collection = db.collection('facebook');
		var val = collection.find({}).each(function(err,docs){
			return docs;
			callback();
			});
		return val;
	}
	
	console.log(val);
	return val;
	
	
}*/

module.exports = {storeJson};