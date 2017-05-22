var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Google;
(function (Google) {
    var Maps;
    (function (Maps) {
        "use strict";
        var template = "<div class='ruler-tooltip'></div>";
        var RulerTooltip = (function (_super) {
            __extends(RulerTooltip, _super);
            function RulerTooltip(location, text, map) {
                _super.call(this);
                this._location = location;
                this._text = text;
                this.setMap(map);
            }
            RulerTooltip.prototype.draw = function () {
                var projection = this.getProjection();
                var position = projection.fromLatLngToDivPixel(this._location);
                var css = {
                    left: position.x + "px",
                    top: position.y + "px"
                };
                console.log(css);
                this._container.css(css);
            };
            RulerTooltip.prototype.onAdd = function () {
                this._container = jQuery(template).html(this._text);
                this.getPanes().overlayLayer.appendChild(this._container.get(0));
            };
            RulerTooltip.prototype.onRemove = function () {
                if (this._container) {
                    this._container.remove();
                }
            };
            return RulerTooltip;
        }(google.maps.OverlayView));
        Maps.RulerTooltip = RulerTooltip;
    })(Maps = Google.Maps || (Google.Maps = {}));
})(Google || (Google = {}));
