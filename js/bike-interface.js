
$(document).ready(function() {

  $('#formOne').submit(function(e) {
    e.preventDefault();

    let location = $('.location').val();
    $('.location').val("");

    $.ajax({
      url: `https://bikeindex.org:443/api/v3/search?location=${location}&distance=100&stolenness=proximity`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        let currentDate = (Date.parse(new Date()))/1000;
        let pastweekDate = currentDate - (60*60*24*7);
        response.bikes.forEach(function(item) {

          if (item.date_stolen <= currentDate && item.date_stolen >= pastweekDate) {
            var d = new Date(item.date_stolen*1000)
            var n = d.toUTCString();
            $('#output').append(`${item.title}`+"<br>"+`${n}`+"<br>"+`${item.stolen_location}`+"<br>");
          }
        });
      },
      error: function() {
        $('#errors').text("There was an error processing your request. Please try again.");
      }
    });
    $("#formOne").hide();
    $("#output").show();



  });

});
