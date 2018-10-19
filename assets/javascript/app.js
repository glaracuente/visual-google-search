var searchTerm;

$(document).on("click", '#add-website', function (event) {
    event.preventDefault();

    var userInput = $("#website-input").val();
    if (userInput.length === 0) {
        return
    }
    $("#websitePreview").empty()
    searchTerm = userInput
    console.log(searchTerm)

    var queryURL = "https://www.googleapis.com/customsearch/v1?q=" + searchTerm + "&cx=004310597913395645264:paiega8jyuo&key=AIzaSyDmxfk0xMoLe6Sup48zTQPXmG0wpcgENyY"


    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response)
            sites = response.items
            for (var i = 0; i < sites.length; i++) {
                //var site = sites[i].link
                var site = sites[i]
                var auth = '2376-rutgersproject1';
                var imgUrl = 'http://image.thum.io/get/auth/' + auth + '/' + site;

                var preview = $("<div>").html('<img class="site" style="-webkit-user-select: none;" src="' + imgUrl + '">').addClass("websites")
                $("#websitePreview").prepend(preview)

            }
        });

});