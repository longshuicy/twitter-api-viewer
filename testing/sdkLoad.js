window.fbAsyncInit = function() {
    FB.init({
      appId      : process.env.FACEBOOK_APP_ID,
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
   
FB.api(
    "/search",
    {
        "type": "topic",
        "q": "lebron james",
        "fields": "id,name,page"
    },
    function (response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
);