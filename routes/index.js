var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Social Sense API Query System',
                        providers:[
                          {name: 'Twitter', url:'/twitter'},
                          {name: 'Reddit', url:'/reddit'},         
                          {name: 'Youtube', url:'/youtube'} 
                        ]
                      });
});

module.exports = router;
