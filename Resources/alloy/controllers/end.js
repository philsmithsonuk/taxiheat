function Controller() {
    function ggDialog() {
        var dialog = Ti.UI.createAlertDialog({
            title: L("alrt_end"),
            buttonNames: [ "OK" ]
        });
        dialog.addEventListener("click", function() {
            var index = new Alloy.createController("index").getView();
            index.open();
            $.end.close();
        });
        dialog.show();
    }
    function submitFare() {
        var start_lat = Ti.App.Properties.getString("startPositionLat");
        var start_lng = Ti.App.Properties.getString("startPositionLong");
        var end_lat = Ti.App.Properties.getString("endPositionLat");
        var end_lng = Ti.App.Properties.getString("endPositionLong");
        var fare = $.txf_fare.value;
        var totalTime = Ti.App.Properties.getString("totalTime");
        var plate = Ti.App.Properties.getString("taxiPlate");
        var xhr = Ti.Network.createHTTPClient();
        xhr.onerror = function() {
            alert(L("alrt_offline"));
        };
        xhr.onload = function() {
            ggDialog();
        };
        xhr.open("POST", "http://www.taxiheat.com/saveJourney.php");
        xhr.send({
            start_lat: start_lat,
            start_lng: start_lng,
            end_lat: end_lat,
            end_lng: end_lng,
            fare: fare,
            time: totalTime,
            plate: plate
        });
    }
    function validForm(fare) {
        if ("" == fare) return false;
        return true;
    }
    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371;
        var dLat = deg2rad(lat2 - lat1);
        var dLon = deg2rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        d = Math.round(100 * d) / 100;
        return d;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "end";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.end = Ti.UI.createWindow({
        backgroundColor: "black",
        color: "#fff",
        layout: "vertical",
        font: {
            fontFamily: "Helvetica"
        },
        id: "end"
    });
    $.__views.end && $.addTopLevelView($.__views.end);
    $.__views.__alloyId4 = Alloy.createController("background", {
        id: "__alloyId4",
        __parentSymbol: $.__views.end
    });
    $.__views.__alloyId4.setParent($.__views.end);
    $.__views.__alloyId5 = Ti.UI.createView({
        layout: "vertical",
        width: "270dp",
        id: "__alloyId5"
    });
    $.__views.end.add($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createLabel({
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "0dp",
        backgroundColor: "black",
        font: {
            fontSize: 24,
            fontWeight: "bold"
        },
        height: "50dp",
        backgroundGradient: {
            startPoint: {
                y: "0%"
            },
            endPoint: {
                y: "100%"
            },
            colors: [ "#343434", "#020202" ]
        },
        width: "270dp",
        text: L("end_heading"),
        id: "__alloyId6"
    });
    $.__views.__alloyId5.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "#e7e5e2",
        color: "black",
        width: "270dp",
        id: "__alloyId7"
    });
    $.__views.__alloyId5.add($.__views.__alloyId7);
    $.__views.view_distTime = Ti.UI.createView({
        layout: "horizontal",
        height: "150dp",
        backgroundColor: "#f5f5f5",
        id: "view_distTime"
    });
    $.__views.__alloyId7.add($.__views.view_distTime);
    $.__views.view_distance = Ti.UI.createView({
        layout: "vertical",
        width: "50%",
        id: "view_distance"
    });
    $.__views.view_distTime.add($.__views.view_distance);
    $.__views.lbl_distanceValue = Ti.UI.createLabel({
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "10dp",
        id: "lbl_distanceValue"
    });
    $.__views.view_distance.add($.__views.lbl_distanceValue);
    $.__views.lbl_distance = Ti.UI.createLabel({
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "lbl_distance"
    });
    $.__views.view_distance.add($.__views.lbl_distance);
    $.__views.view_time = Ti.UI.createView({
        layout: "vertical",
        width: "50%",
        id: "view_time"
    });
    $.__views.view_distTime.add($.__views.view_time);
    $.__views.lbl_timeValue = Ti.UI.createLabel({
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "lbl_timeValue"
    });
    $.__views.view_time.add($.__views.lbl_timeValue);
    $.__views.lbl_time = Ti.UI.createLabel({
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "lbl_time"
    });
    $.__views.view_time.add($.__views.lbl_time);
    $.__views.lbl_fare = Ti.UI.createLabel({
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: L("lbl_fare"),
        id: "lbl_fare"
    });
    $.__views.__alloyId7.add($.__views.lbl_fare);
    $.__views.txf_fare = Ti.UI.createTextField({
        width: "200dp",
        backgroundColor: "white",
        id: "txf_fare"
    });
    $.__views.__alloyId7.add($.__views.txf_fare);
    $.__views.submit_fare = Ti.UI.createButton({
        backgroundGradient: {
            startPoint: {
                y: "0%"
            },
            endPoint: {
                y: "100%"
            },
            colors: [ {
                color: "#fb8b72",
                offset: 0
            }, {
                color: "#f94924",
                offset: .5
            }, {
                color: "#e22900",
                offset: .5
            }, {
                color: "#fe3f00",
                offset: 1
            } ]
        },
        font: {
            fontWeight: "bold"
        },
        color: "#fff",
        borderRadius: "5dp",
        borderWidth: "2dp",
        borderColor: "#000",
        left: "10dp",
        right: "10dp",
        top: "10dp",
        title: L("submit_fare"),
        id: "submit_fare"
    });
    $.__views.__alloyId7.add($.__views.submit_fare);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.submit_fare.addEventListener("click", function() {
        var fare = $.txf_fare.value;
        if (validForm(fare)) if (Ti.Network.online) submitFare(); else {
            var dialog = Ti.UI.createAlertDialog({
                title: L("alrt_offline"),
                buttonNames: [ "OK", "CANCEL" ]
            });
            dialog.addEventListener("click", function(e) {
                switch (e.index) {
                  case 0:
                    break;

                  case 1:
                    var index = new Alloy.createController("index").getView();
                    index.open();
                    $.end.close();
                    break;

                  default:                }
            });
            dialog.show();
        } else alert(L("alrt_fare"));
    });
    var timeTaken = function() {
        var startTime = Ti.App.Properties.getString("startTime");
        var endTime = Ti.App.Properties.getString("endTime");
        var totalTime = endTime - startTime;
        Ti.App.Properties.setString("totalTime", totalTime);
        var totalSec = parseInt(totalTime / 1e3);
        hours = parseInt(totalSec / 3600) % 24;
        minutes = parseInt(totalSec / 60) % 60;
        seconds = totalSec % 60;
        result = (10 > minutes ? "0" + minutes : minutes) + ":" + (10 > seconds ? "0" + seconds : seconds);
        $.lbl_timeValue.text = result;
    };
    new timeTaken();
    var calculateDistance = function calculateDistance() {
        var lat1 = Ti.App.Properties.getString("startPositionLong");
        var lon1 = Ti.App.Properties.getString("startPositionLat");
        var lat2 = Ti.App.Properties.getString("endPositionLong");
        var lon2 = Ti.App.Properties.getString("endPositionLat");
        $.lbl_distanceValue.text = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
    };
    new calculateDistance();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;