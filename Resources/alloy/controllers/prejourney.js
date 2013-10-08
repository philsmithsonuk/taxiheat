function Controller() {
    function validForm(phone, plate) {
        if ("" == phone || "" == plate) {
            alert(L("complete_all"));
            return false;
        }
        return true;
    }
    function saveForm(phone, plate) {
        Ti.App.Properties.setString("taxiPhone", phone);
        Ti.App.Properties.setString("taxiPlate", plate);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "prejourney";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.prejourney = Ti.UI.createWindow({
        backgroundColor: "black",
        color: "#fff",
        layout: "vertical",
        font: {
            fontFamily: "Helvetica"
        },
        id: "prejourney"
    });
    $.__views.prejourney && $.addTopLevelView($.__views.prejourney);
    $.__views.__alloyId16 = Alloy.createController("background", {
        id: "__alloyId16",
        __parentSymbol: $.__views.prejourney
    });
    $.__views.__alloyId16.setParent($.__views.prejourney);
    $.__views.__alloyId17 = Ti.UI.createView({
        layout: "vertical",
        width: "270dp",
        backgroundColor: "red",
        id: "__alloyId17"
    });
    $.__views.prejourney.add($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createLabel({
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
        text: L("prejourney_heading"),
        id: "__alloyId18"
    });
    $.__views.__alloyId17.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "#e7e5e2",
        color: "black",
        width: "270dp",
        id: "__alloyId19"
    });
    $.__views.__alloyId17.add($.__views.__alloyId19);
    $.__views.lbl_taxiPlate = Ti.UI.createLabel({
        color: "black",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        shadowColor: "#fff",
        shadowOffset: {
            x: 1,
            y: 1
        },
        top: "5dp",
        text: L("lbl_taxiPlate"),
        id: "lbl_taxiPlate"
    });
    $.__views.__alloyId19.add($.__views.lbl_taxiPlate);
    $.__views.txf_taxiPlate = Ti.UI.createTextField({
        width: "160dp",
        font: {
            fontSize: 15
        },
        color: "#fff",
        top: "5dp",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#000",
        borderRadius: "5dp",
        borderWidth: "2dp",
        id: "txf_taxiPlate"
    });
    $.__views.__alloyId19.add($.__views.txf_taxiPlate);
    $.__views.lbl_taxiPhone = Ti.UI.createLabel({
        color: "black",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        shadowColor: "#fff",
        shadowOffset: {
            x: 1,
            y: 1
        },
        top: "5dp",
        text: L("lbl_taxiPhone"),
        id: "lbl_taxiPhone"
    });
    $.__views.__alloyId19.add($.__views.lbl_taxiPhone);
    $.__views.txf_taxiPhone = Ti.UI.createTextField({
        width: "160dp",
        font: {
            fontSize: 15
        },
        color: "#fff",
        top: "5dp",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#000",
        borderRadius: "5dp",
        borderWidth: "2dp",
        id: "txf_taxiPhone"
    });
    $.__views.__alloyId19.add($.__views.txf_taxiPhone);
    $.__views.start_journey = Ti.UI.createButton({
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
        title: L("start_journey"),
        id: "start_journey"
    });
    $.__views.__alloyId19.add($.__views.start_journey);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.start_journey.addEventListener("click", function() {
        var phone = $.txf_taxiPhone.value;
        var plate = $.txf_taxiPlate.value;
        if (validForm(phone, plate)) {
            saveForm(phone, plate);
            if (Ti.Geolocation.locationServicesEnabled) {
                Ti.API.info("location services: " + Ti.Geolocation.locationServicesEnabled);
                Ti.Geolocation.purpose = L("alrt_locationRequest");
                Ti.Geolocation.getCurrentPosition(function(e) {
                    if (e) {
                        Ti.API.info(e);
                        Ti.App.Properties.setString("startTime", new Date().getTime());
                        Ti.App.Properties.setString("startPositionLong", e.coords.longitude);
                        Ti.App.Properties.setString("startPositionLat", e.coords.latitude);
                        var injourney = new Alloy.createController("injourney").getView();
                        injourney.open();
                        $.prejourney.close();
                    } else alert(L("alrt_gpsFail"));
                });
            }
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;