function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "background";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.background = Ti.UI.createView({
        layout: "vertical",
        top: 0,
        backgroundImage: "background-image.png",
        height: "172dp",
        id: "background"
    });
    $.__views.background && $.addTopLevelView($.__views.background);
    $.__views.image_logo = Ti.UI.createImageView({
        backgroundColor: "transparent",
        top: "32dp",
        height: "100",
        width: "100",
        id: "image_logo",
        image: "logo.png"
    });
    $.__views.background.add($.__views.image_logo);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;