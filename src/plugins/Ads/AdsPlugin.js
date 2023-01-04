"use strict";
var exports = {};
exports.__esModule = true;
var Ads_1 = require("./Ads");
var AdsPlugin = /** @class */ (function () {
    function AdsPlugin() {
        this.ads = Ads_1["default"].getInstance();
        this.adsContainer = document.createElement("div");
    }
    AdsPlugin.prototype.run = function (player) {
        var _this = this;
        player.container.appendChild(this.adsContainer);
        player.video.addEventListener("timeupdate", function () {
            var currentTime = Math.floor(player.video.currentTime);
            if (currentTime % 30 === 0) {
                _this.renderAd();
            }
        });
    };
    AdsPlugin.prototype.renderAd = function () {
        var _this = this;
        if (this.currentAd) {
            return;
        }
        var ad = this.ads.getAds();
        this.currentAd = ad;
        this.adsContainer.innerHTML = "\n        <div class=\"ads\">\n            <a class=\"ads__links\" href=\"".concat(this.currentAd.url, "\" target=\"_blank\">\n                <img class=\"ads__img\" src=\"").concat(this.currentAd.imageUrl, "\"/>\n                <div class=\"ads__info\">\n                    <h5 class=\"ads__title\">").concat(this.currentAd.title, "</h5>\n                    <p class=\"ads__body\">").concat(this.currentAd.body, "</p>\n                </div>\n            </a>\n        </div>\n        ");
        setTimeout(function () {
            _this.currentAd = null;
            _this.adsContainer.innerText = "";
        }, 10000);
    };
    return AdsPlugin;
}());
exports["default"] = AdsPlugin;
