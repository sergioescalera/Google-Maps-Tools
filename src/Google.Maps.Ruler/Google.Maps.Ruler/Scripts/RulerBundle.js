var Google;
(function (Google) {
    var Maps;
    (function (Maps) {
        "use strict";
        var templates = {
            ruler: function () { return "<div class='ruler-wrapper'>\n            <label for='rulerToggle'>Measure distance</label><input id='rulerToggle' type='checkbox' /></div>"; },
            rulerPopup: function () { return "<div class='ruler-popup-wrapper'>\n                <div class='ruler-title'>Measure distance</div>\n                <div class='ruler-instructions'>Click on the map to trace a path you want to measure</div>\n                <div class='ruler-distance'>Total distance:\n                    <span class='ruler-distance-miles'></span>\n                    <span class='ruler-distance-km'></span></div>\n            </div>"; }
        };
        var Ruler = (function () {
            function Ruler(map, togglePosition, popupPosition) {
                if (togglePosition === void 0) { togglePosition = google.maps.ControlPosition.TOP_LEFT; }
                if (popupPosition === void 0) { popupPosition = google.maps.ControlPosition.BOTTOM_CENTER; }
                this.on = false;
                this._map = map;
                this._toggleControl = jQuery(templates.ruler());
                this._toggleControl.find("[type=checkbox]").click(this.TogglePopup.bind(this));
                this._popupControl = jQuery(templates.rulerPopup()).hide();
                this._distanceControl = this._popupControl.find(".ruler-distance");
                this._distanceMilesControl = this._popupControl.find(".ruler-distance-miles");
                this._distanceKmControl = this._popupControl.find(".ruler-distance-km");
                this._map.controls[togglePosition].push(this._toggleControl.get(0));
                this._map.controls[popupPosition].push(this._popupControl.get(0));
                this._map.addListener("click", this.AddPoint.bind(this));
                this.Reset();
                this.UpdateDistance();
            }
            Object.defineProperty(Ruler.prototype, "poly", {
                get: function () {
                    if (!this._poly) {
                        this._poly = new google.maps.Polyline({
                            editable: true,
                            strokeColor: "#000",
                            strokeOpacity: 1.0,
                            strokeWeight: 2.5
                        });
                        this._poly.setMap(this._map);
                        var path = this._poly.getPath();
                        google.maps.event.addListener(path, "insert_at", this.CalculateDistance.bind(this));
                        google.maps.event.addListener(path, "remove_at", this.CalculateDistance.bind(this));
                        google.maps.event.addListener(path, "set_at", this.CalculateDistance.bind(this));
                    }
                    return this._poly;
                },
                enumerable: true,
                configurable: true
            });
            Ruler.prototype.AddPoint = function (ev) {
                if (!this.on) {
                    return;
                }
                var point = ev.latLng;
                this.poly.getPath().push(point);
            };
            Ruler.prototype.CalculateDistance = function () {
                if (!this._poly) {
                    return;
                }
                var path = this._poly.getPath();
                var locations = path.getArray();
                this._distances = [];
                var distance = 0;
                for (var i = 1; i < locations.length; i++) {
                    var from = locations[i - 1];
                    var to = locations[i];
                    var km = google.maps.geometry.spherical.computeDistanceBetween(from, to) * 0.001;
                    distance += km;
                    this._distances.push(distance);
                }
                this.UpdateDistance();
            };
            Ruler.prototype.ClearTooltips = function () {
                if (this._tooltips) {
                    this._tooltips.forEach(function (t) { return t.setMap(null); });
                }
                this._tooltips = [];
            };
            Ruler.prototype.Reset = function () {
                if (this._poly) {
                    this._poly.setMap(null);
                }
                this._poly = null;
                this._distances = [];
                this.ClearTooltips();
            };
            Ruler.prototype.TogglePopup = function () {
                this._popupControl.toggle(100);
                this.on = !this.on;
                if (!this.on) {
                    this.Reset();
                    this.UpdateDistance();
                }
            };
            Ruler.prototype.UpdateDistance = function () {
                if (this._distances.length === 0) {
                    this._distanceControl.hide();
                }
                else {
                    this._distanceControl.show();
                }
                this.ClearTooltips();
                if (this._poly) {
                    var path = this._poly.getPath();
                    var locations = path.getArray();
                    for (var i = 1; i < locations.length; i++) {
                        var location = locations[i];
                        var miles = this._distances[i - 1] * 0.62137119;
                        var text = miles.toFixed(2) + " miles";
                        var tooltip = new Maps.RulerTooltip(location, text, this._map);
                        this._tooltips.push(tooltip);
                    }
                }
                var distance = this._distances.length > 0 ? this._distances[this._distances.length - 1] : 0;
                this._distanceKmControl.text("(" + distance.toFixed(2) + " km)");
                this._distanceMilesControl.text((distance * 0.62137119).toFixed(2) + " miles");
            };
            return Ruler;
        }());
        Maps.Ruler = Ruler;
    })(Maps = Google.Maps || (Google.Maps = {}));
})(Google || (Google = {}));

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

var RulerDemo;
(function (RulerDemo) {
    var latitude = 38;
    var longitude = -100;
    var zoom = 8;
    var map;
    var center;
    var canvas;
    var ruler;
    function init() {
        initMap();
        initRuler();
    }
    RulerDemo.init = init;
    function initMap() {
        center = new google.maps.LatLng(latitude, longitude);
        canvas = document.getElementById("map-canvas");
        map = new google.maps.Map(canvas, {
            zoom: zoom,
            center: center,
            zoomControl: true,
            scaleControl: true,
            mapTypeControl: true,
            rotateControl: true,
            draggable: true,
            draggableCursor: "default",
            draggingCursor: "move",
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    }
    function initRuler() {
        ruler = new Google.Maps.Ruler(map);
    }
})(RulerDemo || (RulerDemo = {}));