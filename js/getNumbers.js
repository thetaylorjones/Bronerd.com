$(function(){
  var numUrl = "https://spreadsheets.google.com/feeds/list/0AoCF7p_80MzLdDNScDJFYUYzRUdaN0kxV2EzVlpTOXc/od6/public/values?alt=json";
  $.ajax({
    type: "GET",
    url: numUrl,
    success: function(data){
      var thedata = data.feed.entry;
      var cupsofcoffee = thedata;

      console.log(cupsofcoffee);
    }
  });
});
