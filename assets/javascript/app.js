var searchTerm;

// Initial array of history
try {
    var storedHistory = JSON.parse(localStorage.getItem("history"))
    console.log(storedHistory.length)
}
catch (err) {
    var storedHistory = []
}

for (var i = 0; i < storedHistory.length; i++) {
    var newDiv = $("<div>").html(storedHistory[i])
    $("#history-appears-here").prepend(newDiv)
}

$(document).on("click", "#clearHistory", function () {
    $("#history-appears-here").empty()
    storedHistory = []
    localStorage.setItem("history", JSON.stringify(storedHistory))
    $("#history-appears-here").append('<button id="clearHistory">Clear History</button>')
});

$(document).on("click", '#add-website', function (event) {
    event.preventDefault();

    var userInput = $("#website-input").val();
    if (userInput.length === 0) {
        return
    }
    console.log(storedHistory)
    if (storedHistory.indexOf(userInput) === -1) {
        console.log("here")
        storedHistory.push(userInput)
        localStorage.setItem("history", JSON.stringify(storedHistory))
        var newDiv = $("<div>").html(storedHistory[i])
        $("#history-appears-here").prepend(newDiv)
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
                console.log(site)
                var site = sites[i].link
                var auth = '2376-rutgersproject1';
                var imgUrl = 'http://image.thum.io/get/auth/' + auth + '/' + site;



                var preview = $("<div>").html('<img class="site" style="-webkit-user-select: none;" src="' + imgUrl + '">').addClass("websites")
                preview.attr("data-url", site)
                preview.attr("data-toggle", "modal")
                preview.attr("data-target", "#myModal")


                var info = $("<div>");
                info.addClass("info");

                var flip = $("<div>");
                flip.addClass("flip");
                flip.text("Click for More Info!");

                var panel = $("<div>");
                panel.addClass("panel");
                panel.html("<p>" + sites[i].title + "</p><p>" + sites[i].snippet + "</p>");

                info.prepend(panel);
                info.prepend(flip);

                var favButton = $("<button>").addClass("fav fas fa-star")

                var holder = $("<div>").addClass("holder")
                var outerHolder = $("<div>").addClass("outerHolder")
                holder.append(favButton)
                holder.append(preview)
                holder.append(info)

                outerHolder.append(holder)

                $("#websitePreview").prepend(outerHolder)
            }

        });

    $(document).on("click", '.flip', function () {
        $(".panel").slideToggle("slow", function () {
            console.log("slide")
        });

    });

    $(document).on("click", "#clearHistory", function () {
        console.log("empry")
        //$("#history-appears-here").empty()
    });




    var modal = document.getElementById('myModal');
    //var span = document.getElementsByClassName("close")[0];
    var popup = $("<div>")


    $(document).on("click", '.websites', function () {
        // Get the modal
        // Get the <span> element that closes the modal
        modal.style.display = "block";
        var url = $(this).attr('data-url');
        popup.html('<iframe width="100%" height="700px" frameborder="0" scrolling="yes" allowtransparency="true" src="' + url + '"></iframe>');
        $(".modal-content").append(popup)
    });


    // When the user clicks on <span> (x), close the modal
    $(document).on("click", '.close', function () {
        modal.style.display = "none";
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

});
