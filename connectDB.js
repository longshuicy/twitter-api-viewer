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

module.exports = storeJson;