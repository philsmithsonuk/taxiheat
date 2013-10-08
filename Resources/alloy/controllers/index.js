function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "black",
        color: "#fff",
        layout: "vertical",
        font: {
            fontFamily: "Helvetica"
        },
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId8 = Alloy.createController("background", {
        id: "__alloyId8",
        __parentSymbol: $.__views.index
    });
    $.__views.__alloyId8.setParent($.__views.index);
    $.__views.__alloyId9 = Ti.UI.createView({
        layout: "vertical",
        width: "270dp",
        id: "__alloyId9"
    });
    $.__views.index.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createLabel({
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
        text: L("index_title"),
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    $.__views.__alloyId11 = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "#e7e5e2",
        color: "black",
        width: "270dp",
        id: "__alloyId11"
    });
    $.__views.__alloyId9.add($.__views.__alloyId11);
    $.__views.info = Ti.UI.createLabel({
        color: "black",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 14
        },
        shadowColor: "#fff",
        shadowOffset: {
            x: 1,
            y: 1
        },
        left: "10dp",
        right: "10dp",
        top: "10dp",
        text: L("index_info"),
        id: "info"
    });
    $.__views.__alloyId11.add($.__views.info);
    $.__views.start_button = Ti.UI.createButton({
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
        title: L("start_button"),
        id: "start_button"
    });
    $.__views.__alloyId11.add($.__views.start_button);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    $.start_button.addEventListener("click", function() {
        var config = new Alloy.createController("config").getView();
        config.open();
        $.index.close();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;