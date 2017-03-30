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
//# sourceMappingURL=Demo.js.map