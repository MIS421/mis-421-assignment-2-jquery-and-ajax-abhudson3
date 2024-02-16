var len;
var results = "";

let apiKey = "64af74d318a24ea3aca7f2c777a3faac";
let apiURL = "https://api.bing.microsoft.com/v7.0/search/";

function apiSearch() {
    var params = {
        q: $("#query").val(),
        count: "50",
        offset: "0",
        mkt: "en-us",
    };

    $.ajax({
        url: "https://api.bing.microsoft.com/v7.0/search?" + $.param(params),
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader(
                "Ocp-Apim-Subscription-Key",
                "4eb75180d86a4e73afa062ce7e2087b8"
            );
        },
        type: "GET",
    })
        .done(function (data) {
            len = data.webPages.value.length;
            for (i = 0; i < len; i++) {
                results +=
                    "<p><a href='" +
                    data.webPages.value[i].url +
                    "'>" +
                    data.webPages.value[i].name +
                    "</a>: " +
                    data.webPages.value[i].snippet +
                    "</p>";
            }

            $("#searchResults").html(results);
            // $("#searchResults").dialog();
        })
        .fail(function () {
            alert("error");
        });
}

// Wait for the DOM to be ready
$(document).ready(function () {
    // Display the current time immediately when the page loads
    displayCurrentTime();
    $("#searchEngineName").click(function () {
        // Call the function to change the background image
        changeBackgroundImage();
    });
    $("#currentTimeDisplay").click(function () {
        $("#time").html("Current time: " + getCurrentTime());
        $("#time").dialog();
    });

    // Function to display the current time
    function displayCurrentTime() {
        // Get the current time
        var currentTime = getCurrentTime();

        // Display the current time in the designated element
        $("#currentTimeDisplay").text("Current Time: " + currentTime);

        // Update the time every second (1000 milliseconds)
        setInterval(function () {
            currentTime = getCurrentTime();
            $("#currentTimeDisplay").text("Current Time: " + currentTime);
        }, 1000);
    }

    var backgroundImageIndex = 0; // Track the current background image index

   

    // Updated changeBackgroundImage function
    function changeBackgroundImage() {
        var backgroundImageUrls = [
            "url('https://images.unsplash.com/photo-1707770581480-beefabdea1e9?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8Ym84alFLVGFFMFl8fGVufDB8fHx8fA%3D%3D')",
            "url('https://images.unsplash.com/photo-1707597941447-4f65515e628e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDV8Ym84alFLVGFFMFl8fGVufDB8fHx8fA%3D%3D')",
            // Add more image URLs as needed
        ];

        // Toggle between two images
        backgroundImageIndex = (backgroundImageIndex + 1) % backgroundImageUrls.length;

        // Set the body's background image
        $("body").css("background-image", backgroundImageUrls[backgroundImageIndex]);
    }

    // Function to get the current time
    function getCurrentTime() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();

        // Format the time as HH:MM:SS
        var formattedTime = padZero(hours) + ":" + padZero(minutes);

        return formattedTime;
    }

    // Function to pad single-digit numbers with a leading zero
    function padZero(num) {
        return (num < 10 ? "0" : "") + num;
    }

    $("#searchButton").click(function () {
        apiSearch();
    });
});
//
