$(document).ready(function(){
    var topics = ["Belize", 'Thailand', "Morocco", "Egypt", "Mecca", "Ecuador", "Trinidad", "Jamaica", "England", "Australia"];

//render buttons
function renderButton() {
$("#button-view").empty();

    for (var i = 0; i < topics.length; i++) {
        var b = $("<button>");
        b.addClass("gifBtn btn btn-outline-success");
        b.attr("data-name", topics[i]);
        b.text(topics[i]);
        $("#button-view").append(b);
       

    }
}
  
    renderButton();

    //click handler for ajax call
$(document).on("click",".gifBtn", function() {
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
        for (var i=0; i<results.length; i++){
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
    topic = $("#search-input").val().trim();
    var newBtn = $("<button>");
    newBtn.addClass("gifBtn btn btn-outline-success");
    newBtn.attr("data-name", topic);
    newBtn.text(topic);
    $("#button-view").append(newBtn)
    console.log(topic);
    topics.push(topic);
    console.log(topics);
   
});

//changing state of gif
$(document).on("click",".gif", function(){
    var state = $(this).attr("data-state");
    if(state == "still"){
        $(this).attr({'src':$(this).attr('data-animate'), 'data-state':"animate"});
    }else{
        $(this).attr({'src':$(this).attr('data-still'), 'data-state':"still"});
    }
});

});
