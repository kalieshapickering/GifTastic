var topics = ["Belize", 'Thailand', "Morocco", "Egypt", "Mecca", "Ecuador", "Trinidad", "Jamaica", "England", "Australia"];

//render buttons
function renderButton() {


    for (var i = 0; i < topics.length; i++) {
        var b = $("<button>");
        b.addClass("gif btn btn-outline-success");
        b.attr("data-name", topics[i]);
        b.text(topics[i]);
        $("#button-view").append(b);
        console.log(b);

    }
}
  

$(document).ready(function(){
    renderButton();

    //click handler
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
            topicsImg.attr("src", results[i].images.fixed_height_still.url);
            topicsDiv.append(topicsImg, p);
            $("#giphy-view").prepend(topicsDiv);
            console.log(topicsImg);
        } 


    }).catch(function (error) {
        console.log(error);
    });
}); 
});
