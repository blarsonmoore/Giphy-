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
    event.preventDefault();
    var userInput = $("#sitcomInput").val();
    gifArray.push(userInput)
    $("#sitcomInput").val("");
    addButtons();
  });


  $(document).on("click", "#sitcomButtons", function (e) {
    // var gifDisplay = $("#giffyPic").text();
    console.log(e.target);
    var gifDisplay = e.target.innerHTML;

    // $("#sitcomButtons").empty();
    var giphyURL = "https://api.giphy.com/v1/gifs/search?api_key=yrUL7JUduZPHSvywa6qyfPyXGgAiVkPa&q=" + gifDisplay + "&limit=10&offset=0&rating=PG-13&lang=en";
    $.ajax({
      url: giphyURL,
      method: "GET",
    }).then(function (response) {
      var results = response.data;
      console.log(results);

      for (var i = 0; i < results.length; i++) {
        var giphyDiv = $("<div>");
        var giphyImage = $("<img>");
        var animate = results[i].images.fixed_width.url;
        var still = results[i].images.fixed_width_still.url;
        giphyImage.attr("src", still);
        giphyImage.attr("alt", "Hello World");
        giphyImage.attr("id", "displayGif");
        giphyImage.attr("data-state", "still");
        giphyDiv.addClass("style");
        giphyDiv.append(giphyImage);
        $("#giphy").prepend(giphyDiv);
      }
      $("#displayGif").on("click", function () {

        var state = $("#displayGif").attr("data-state");


        if (state === "still") {
          $("#displayGif").attr("src", animate);
          $("#displayGif").attr("data-state", "animate");
        }
        else if (state === "animate") {
          $("#displayGif").attr("src", still);
          $("#displayGif").attr("data-state", "still");
        }
        else {
          $("#displayGif").attr("src", $("#displayGif").attr("data-still"));
          $("#displayGif").attr("data-state", "still");
        }
      });
    });

  });
  addButtons();
});
