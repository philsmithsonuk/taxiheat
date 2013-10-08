function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "injourney";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.injourney = Ti.UI.createWindow({
        backgroundColor: "black",
        color: "#fff",
        layout: "vertical",
        font: {
            fontFamily: "Helvetica"
        },
        id: "injourney"
    });
    $.__views.injourney && $.addTopLevelView($.__views.injourney);
    $.__views.__alloyId12 = Alloy.createController("background", {
        id: "__alloyId12",
        __parentSymbol: $.__views.injourney
    });
    $.__views.__alloyId12.setParent($.__views.injourney);
    $.__views.__alloyId13 = Ti.UI.createView({
        layout: "vertical",
        width: "270dp",
        id: "__alloyId13"
    });
    $.__views.injourney.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createLabel({
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
        text: L("injourney_heading"),
        id: "__alloyId14"
    });
    $.__views.__alloyId13.add($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "#e7e5e2",
        color: "black",
        width: "270dp",
        id: "__alloyId15"
    });
    $.__views.__alloyId13.add($.__views.__alloyId15);
    $.__views.lbl_injourney = Ti.UI.createLabel({
        color: "#000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: L("lbl_injourney"),
        backgroundColor: "#fff",
        height: "100dp",
        width: "270dp",
        id: "lbl_injourney"
    });
    $.__views.__alloyId15.add($.__views.lbl_injourney);
    $.__views.btn_help = Ti.UI.createButton({
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
        title: L("btn_help"),
        height: "100dp",
        id: "btn_help"
    });
    $.__views.__alloyId15.add($.__views.btn_help);
    $.__views.btn_endJourney = Ti.UI.createButton({
        backgroundGradient: {
            startPoint: {
                y: "0%"
            },
            endPoint: {
                y: "100%"
            },
            colors: [ {
                color: "#fcc278",
                offset: 0
            }, {
                color: "#f8a535",
                offset: .5
            }, {
                color: "#f18700",
                offset: .5
            }, {
                color: "#faac16",
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
        title: L("end_journey"),
        id: "btn_endJourney"
    });
    $.__views.__alloyId15.add($.__views.btn_endJourney);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.btn_help.addEventListener("click", function() {
        Ti.Geolocation.purpose = L("alrt_locationRequest");
        Ti.Geolocation.getCurrentPosition(function(e) {
            if (e) {
                Ti.App.Properties.setString("currentPosition", e.coords);
                alert(L("msg_help"));
            } else {
                Ti.App.Properties.getString("startPositionLong", e.coords);
                Ti.App.Properties.getString("startPositionLat", e.coords);
                alert(L("alrt_gpsFailSMSSent"));
            }
        });
    });
    $.btn_endJourney.addEventListener("click", function() {
        Ti.Geolocation.purpose = L("alrt_locationRequest");
        Ti.Geolocation.getCurrentPosition(function(e) {
            if (e) {
                Ti.App.Properties.setString("endPositionLong", e.coords.longitude);
                Ti.App.Properties.setString("endPositionLat", e.coords.latitude);
                Ti.App.Properties.setString("endTime", new Date().getTime());
                var end = new Alloy.createController("end").getView();
                end.open();
                $.injourney.close();
            } else alert(L("alrt_gpsFail"));
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;