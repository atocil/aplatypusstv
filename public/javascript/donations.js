var client_id = '52560de7300496d32b00322d'; // Client id from the Account area
var access_token = 'YTliMTg1MjZiNmNjNjZkY2EyMTA2NmYz'; // Access token from the Account area
var socket = io.connect('https://streamtip.com', {
    query: 'client_id=' + encodeURIComponent(client_id) + '&access_token=' + encodeURIComponent(access_token)
});
socket.on('authenticated', function() {
    console.log('authenticated');
});
socket.on('error', function(err) {
    if (err === '401::Access Denied::') {
        console.log('authentication failed');
    }
});
socket.on('newTip', function(data) {
    donation();
    var amount = "";
    var username = "";
    console.log('donation');
});
function donation() {
    $.ajax({
        url: 'https://streamtip.com/api/tips?client_id=52560de7300496d32b00322d&access_token=YTliMTg1MjZiNmNjNjZkY2EyMTA2NmYz&limit=1',
        type: 'GET',
        dataType: 'jsonp',
        success: function(json) {
            amount = json["tips"][0]["amount"];
            username = json["tips"][0]["username"];
            var username_text = document.getElementById('username_text');
            processDonation();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("error getting donation!");
        }
    });
}
function testdon() {
    amount = $("#Amount").val();
    processDonation();
}
function processDonation() {
    console.log("new donation " + amount);
    if (amount == 2.10) {
        var vid = document.getElementById("210v");
        vid.pause();
        vid.currentTime = 0;
        vid.play();
        $("#210v").fadeToggle(1000);
        setTimeout(function() {
            $("#210v").fadeToggle(1000);
        }, 10000);
    } else if (amount == 4.20) {
        var vid = document.getElementById("420v");
        vid.play();
        vid.currentTime = 0;
        $("#420v").fadeToggle(1000);
        setTimeout(function() {
            $("#420v").fadeToggle(1000);
        }, 16000);
    } else if (amount == 8.40) {
        var vid = document.getElementById("840v");
        vid.play();
        vid.currentTime = 0;
        $("#840v").fadeToggle(1000);
        setTimeout(function() {
            $("#840v").fadeToggle(1000);
        }, 20000);
    } else if (amount == 6.66) {
        var vid = document.getElementById("666v");
        vid.play();
        vid.currentTime = 0;
        $("#666v").fadeToggle(1000);
        setTimeout(function() {
            $("#666v").fadeToggle(1000);
        }, 25000);
    } else if (amount == 42.00) {
        var vid = document.getElementById("4200v");
        vid.play();
        vid.currentTime = 0;
        $("#4200v").fadeToggle(1000);
        setTimeout(function() {
            $("#4200v").fadeToggle(1000);
        }, 16000);
    } else if (amount == 17.76) {
        var vid = document.getElementById("1776v");
        vid.play();
        vid.currentTime = 0;
        $("#1776v").fadeToggle(1000);
        setTimeout(function() {
            $("#1776v").fadeToggle(1000);
        }, 26000);
    } else if (amount == 100.00) {
        var vid = document.getElementById("10000v");
        vid.play();
        vid.currentTime = 0;
        $("#10000v").fadeToggle(1000);
        setTimeout(function() {
            $("#10000v").fadeToggle(1000);
        }, 38000);
    } else {
        var vid = document.getElementById("defaultv");
        vid.play();
        vid.currentTime = 0;
        $("#defaultv").fadeToggle(1000);
        setTimeout(function() {
            $("#defaultv").fadeToggle(1000);
        }, 20000);
    }
    var vid = document.getElementById("defaultv");
}