require('dotenv').config();
var FB=require('fb');
FB.options({version:'v2.8'});
FB.setAccessToken(process.env.FACEBOOK_ACCESS_TOKEN);

// get
/*FB.api('4', {fields: ['id', 'name']},function (fb) {
  if(!fb || fb.error) {
   console.log(!fb ? 'error occurred' : fb.error);
   return;
  }
  console.log(fb.id);
  console.log(fb.name);
});*/

//search method
/*var fb = FB.api('search?q=coffee shop there&type=page',function(fb) {
 
    if(!fb || fb.error) {
        console.log(!fb ? 'error occurred' : fb.error);
        return;
    }
	else{
		return fb;
		console.log(fb);
	}
    
});*/

//batch search?
fbData = new Array();
FB.api('','post',{batch: [{method:'get',relative_url:'search?q=coffee shop&type=page'},
						 {method:'get',relative_url:'search?q=coffee shop&type=page'},
						 {method:'get',relative_url:null}]},
						 function(fb) {
 
    if(!fb || fb.error) {
        //console.log(!fb ? 'error occurred' : fb.error);
        return;
    }
	else{
		//console.log(fb[0]);
		//return fb;
		//var i = 0;
		for (var i in fb){
			if (!(JSON.parse(fb[i].body).hasOwnProperty("error"))){
				//console.log(fb[i]);
				for (var j in JSON.parse(fb[i].body).data){
					fbData.push(JSON.parse(fb[i].body).data[j]);
				}
			}
			i = i+1;
		}
		console.log(fbData);
	}
    
});