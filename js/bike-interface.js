

// import {Bike} from './../js/bike.js';

$(document).ready(function() {


    $('#formOne').submit(function(e) {
        e.preventDefault();

        let location = $('.location').val();
        // let stolenDate = new Date($('.date').val());

        $('.location').val("");
        // $('.date').val("");

        // bike = new Bike(stolenDate);


        $.ajax({
            url: `https://bikeindex.org:443/api/v3/search?location=seattle&stolenness=stolen`,
            type: 'GET',
            data: {
                format: 'json'
            },
            success: function(response) {
              let currentDate = Date.parse(new Date());
              let pastweekDate =   Date.parse(new Date())-(7 * 24 * 60 * 60 * 1000);

                response.bikes.forEach(function(item) {
                  if (item.date_stolen <= currentDate && item.date_stolen >= pastweekDate) {
                      $('#output').append(`${item.title}`+"<br>"+`${item.date_stolen}`);

                  }



              });
                // if limit > 0;

                // response.data.forEach(function(item){
                //   $('#pic').append("<img src='"+item.images.fixed_height_still.url+"' />");
                // });
            },
            error: function() {
                $('#errors').text("There was an error processing your request. Please try again.");
            }
        });

        $("#formOne").hide();
        $("#output").show();

            });

});
