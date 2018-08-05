var topics = ["Belize", 'Thailand', "Morocco", "Egypt", "Mecca", "Ecuador", "Trinidad", "Jamaica", "England", "Australia"];

//render buttons
function renderButton() {
$("#button-view").empty();

    for (var i = 0; i < topics.length; i++) {
        var b = $("<button>");
        b.addClass("gif btn btn-outline-success");
        b.attr("data-name", topics[i]);
        b.text(topics[i]);
        $("#button-view").append(b);
       

    }
}
  

$(document).ready(function(){
    renderButton();

    //click handler to for ajax call
$("button").on("click", function() {
    var topic = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=DJuQztvznVVwGIhQctVEMBqoawgXTI70&limit=10";
    console.log(queryURL);
    console.log(topic);
   
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.data;
        for (var i=0; 1<results.length; i++){
            var topicsDiv = $("<div>");
            var p = $("<p>").text("Rating: "+ results[i].rating);
            var topicsImg = $("<img>");
            topicsImg.attr({"src": results[i].images.fixed_height_still.url, "data-state":"still", "data-still":results[i].images.fixed_height_still.url, "data-animate":results[i].images.fixed_height.url});
            topicsImg.addClass("gif");
            topicsDiv.append(topicsImg, p);
            $("#giphy-view").prepend(topicsDiv);
            console.log(topicsImg);
        } 


    }).catch(function (error) {
        console.log(error);
    });
}); 

//add new search button
$(".searchBtn").on("click", function(event){
    event.preventDefault();
    var gif = $("#search-input").val().trim();
    topics.push(gif);
    renderButton();
})

//changing state of gif
$(".gif").on("click", function(){
    var state = $(this).attr("data-state");
    if(state == "still"){
        $(this).attr({'src':$(this).attr('data-animate'), 'data-state':"animate"});
    }else{
        $(this).attr({'src':$(this).attr('data-still'), 'data-state':"still"});
    }
});

});
