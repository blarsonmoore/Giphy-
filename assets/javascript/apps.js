$(document).ready(function () {
  console.log("Im Ready");

  var gifArray = ["Community", "Arrested Development", "30 Rock", "Parks and Rec"];
  var userInput = $("#buttonId").val();
  

  function addButtons() {
    $("#sitcomButtons").empty();

    for (var i = 0; i < gifArray.length; i++) {
      var newButtons = $("<button>").on("click", function () {
        $(this).attr('id', "giffyPic");
      });
      newButtons.addClass("buttonClass");
      newButtons.text(gifArray[i]);
      $("#sitcomButtons").append(newButtons);


    }
  }

  $("#submit").on("click", function () {
    var userInput = $("#sitcomInput").val();
    console.log(userInput);
    gifArray.push(userInput)
    $("#sitcomInput").val("");
    console.log(gifArray);
    addButtons();
  });


  $("#sitcomButtons").on("click", function () {
    var gifDisplay = $("#giffyPic").text();
    var giphyURL = "https://api.giphy.com/v1/gifs/search?api_key=yrUL7JUduZPHSvywa6qyfPyXGgAiVkPa&q=" + gifDisplay + "&limit=10&offset=0&rating=PG-13&lang=en";
    console.log(gifDisplay);
    $.ajax({
      url: giphyURL,
      method: "GET",
    }).then(function (response) {
      var results = response.data;
      console.log(results);

      for (var i = 0; i < results.length; i++) {
        var giphyDiv = $("<div>");
        var giphyImage = $("<img>");
        giphyImage.attr("src", results[i].images.fixed_width.url);
        giphyImage.attr("alt", "Hello World");
        giphyImage.attr("id", "displayGif");
        giphyDiv.addClass("style");
        giphyDiv.append(giphyImage);
        $("#giphy").prepend(giphyDiv);
      }
    });
  });

  addButtons();
});