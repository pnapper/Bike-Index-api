
var apiKey = require('./../.env').apiKey;
import {Tamagotchi} from './../js/tama.js';

$(document).ready(function() {
    let tama = {};

    $('#formOne').submit(function(e) {
        e.preventDefault();

        let petname = $('.petname').val();
        let food = parseInt($('.food').val());
        let attention = parseInt($('.attention').val());
        let rest = parseInt($('.rest').val());
        $('.petname').val("");
        $('.food').val("");
        $('.attention').val("");
        $('.rest').val("");
        tama = new Tamagotchi(petname,food,attention,rest);
        console.log(tama);

        $.ajax({
            url: `https://api.giphy.com/v1/gifs/search?q=${petname}&api_key=${apiKey}&limit=3`,
            type: 'GET',
            data: {
                format: 'json'
            },
            success: function(response) {
                // console.dir(response);
                $('#pic').append("<img src='"+response.data[0].images.fixed_height.url+"' />");

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

        $("#food").text(food);
        $("#attention").text(attention);
        $("#sleep").text(rest);
    });


    $("#feed").click(function(){
        //tama.feed();
        $("#food").text(tama.feed());
    });

    $("#play").click(function(){

        $("#attention").text(tama.play());
    });
    $("#rest").click(function(){

        $("#sleep").text(tama.rest());
    });

    $("#timepass").click(function(){

        tama.timePass();
        
        $("#food").text(tama.foodLevel);
        $("#attention").text(tama.happinessLevel);
        $("#sleep").text(tama.restLevel);
    });

});
