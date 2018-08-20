var topics = ['Iron Man','The Incredible Hulk','Captain America','Thor','Black Widow','Hawkeye', 'The Avengers'];

$(document).ready(buildButtons);
// Event listener for all button elements
$("#btnSubmit").on("click", function(event){
    event.preventDefault();
    var search = $("#favChar").val().trim();
    if (search && topics.indexOf(search) == -1){
        topics.push(search);
        buildButtons();
    }
    $("#favChar").val("");
});

function buildButtons(){
    $("#buttonsDiv").empty();
    for (var i = 0; i < topics.length ; i++){
        var button = $("<button>");
        button.text(topics[i]);
        button.attr("data-search", topics[i]);
        button.attr("data-clicked", "no");
        button.addClass("btn btn-primary btn-search");
        $("#buttonsDiv").append(button);
    }
}

$(document).on("click", ".btn-search", function(event){
    event.preventDefault();        
    var searchChar = $(this).data("search");
    // Constructing a URL to search Giphy for the name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
    searchChar + "&api_key=LCMwKKfdUFUI3kfSaLzKoQ8f6SL9MHme&tag=marvel&limit=10";
    // Performing AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET",
    })
    // After the data comes back from the API
    .then(function(response){
        $("#giphyDiv").empty();
        // Storing an array of results in the results variable
        var results = response.data;
        // Looping over every result item
        for (var i = 0; i < results.length; i++){
            // Storing the result item's rating
            var rating = results[i].rating;
            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13"){
                // Creating a div with the class "giphy"
                var marvelDiv = $("<div class='giphy'>");
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating.toUpperCase());
                var meta = "Rating: " + rating.toUpperCase() + "\n" + "Title: " + results[i].title;
                // Creating an image tag
                var resultImage = $("<img>");
                // Giving the image tag an src attribute of a property pulled off the result item
                resultImage.attr("src", results[i].images.fixed_height_still.url);
                resultImage.attr("title", meta);
                resultImage.attr("data-still", results[i].images.fixed_height_still.url);
                resultImage.attr("data-animate", results[i].images.fixed_height.url);
                resultImage.attr("data-state", "still");
                // Appending the paragraph and resultImage we created to the "marvelDiv" div
                marvelDiv.append(p);
                marvelDiv.append(resultImage);
                // Prepending the marvelDiv to the "#giphyDiv" div in the HTML
                $("#giphyDiv").prepend(marvelDiv);
                $("#giphyDiv").show();
            }
        }
    });
});

$(document).on("click", "img", function(){
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$("#giphyDiv").hide();