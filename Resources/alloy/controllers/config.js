function Controller() {
    function showTiContacts(theLabel) {
        Titanium.Contacts.showContacts({
            cancel: function() {},
            fields: [ "firstName", "lastName", "phone" ],
            selectedProperty: function(e) {
                if (uniqueContact(e)) {
                    Ti.API.info("setting value:" + e.person.fullName);
                    Ti.API.info("setting property:" + e.value);
                    theLabel.setText(e.person.fullName);
                    Ti.App.Properties.setString(theLabel + "_name", e.person.fullName);
                    Ti.App.Properties.setString(theLabel + "_phone", e.value);
                    theLabel.setImage("remove.png");
                } else alert(L("contact_exists"));
            }
        });
    }
    function uniqueContact(e) {
        var c1 = Ti.App.Properties.getString($.lbl_contact1Name + "_name");
        var c1_phone = Ti.App.Properties.getString($.lbl_contact1Name + "_phone");
        if (e.person.fullName == c1 && e.value == c1_phone) return false;
        return true;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "config";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.config = Ti.UI.createWindow({
        backgroundColor: "black",
        color: "#fff",
        layout: "vertical",
        font: {
            fontFamily: "Helvetica"
        },
        id: "config"
    });
    $.__views.config && $.addTopLevelView($.__views.config);
    $.__views.__alloyId0 = Alloy.createController("background", {
        id: "__alloyId0",
        __parentSymbol: $.__views.config
    });
    $.__views.__alloyId0.setParent($.__views.config);
    $.__views.__alloyId1 = Ti.UI.createView({
        layout: "vertical",
        width: "270dp",
        backgroundColor: "blue",
        id: "__alloyId1"
    });
    $.__views.config.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createLabel({
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
        text: L("config_heading"),
        id: "__alloyId2"
    });
    $.__views.__alloyId1.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "#e7e5e2",
        color: "black",
        width: "270dp",
        id: "__alloyId3"
    });
    $.__views.__alloyId1.add($.__views.__alloyId3);
    $.__views.lbl_contact1 = Ti.UI.createLabel({
        color: "black",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "5dp",
        shadowColor: "#fff",
        shadowOffset: {
            x: 1,
            y: 1
        },
        text: L("lbl_contact1"),
        id: "lbl_contact1"
    });
    $.__views.__alloyId3.add($.__views.lbl_contact1);
    $.__views.vie_contact1 = Ti.UI.createView({
        layout: "horizontal",
        backgroundColor: "transparent",
        left: "43dp",
        right: "40dp",
        height: "30dp",
        id: "vie_contact1"
    });
    $.__views.__alloyId3.add($.__views.vie_contact1);
    $.__views.lbl_contact1Name = Ti.UI.createLabel({
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "5dp",
        font: {
            fontSize: 15
        },
        width: "160dp",
        backgroundColor: "#000",
        borderRadius: "5dp",
        borderWidth: "2dp",
        id: "lbl_contact1Name"
    });
    $.__views.vie_contact1.add($.__views.lbl_contact1Name);
    $.__views.img_contact1Add = Ti.UI.createImageView({
        top: "3dp",
        width: "24dp",
        height: "23dp",
        image: "add.png",
        right: 0,
        id: "img_contact1Add"
    });
    $.__views.vie_contact1.add($.__views.img_contact1Add);
    $.__views.save_config = Ti.UI.createButton({
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
        title: L("save_config"),
        id: "save_config"
    });
    $.__views.__alloyId3.add($.__views.save_config);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.save_config.addEventListener("click", function() {
        var prejourney = new Alloy.createController("prejourney").getView();
        prejourney.open();
        $.config.close();
    });
    if (Ti.App.Properties.getString($.lbl_contact1Name + "_name")) {
        $.lbl_contact1Name.setText(Ti.App.Properties.getString($.lbl_contact1Name + "_name"));
        $.img_contact1Add.setImage("remove.png");
    }
    $.img_contact1Add.addEventListener("click", function() {
        showTiContacts($.lbl_contact1Name);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;