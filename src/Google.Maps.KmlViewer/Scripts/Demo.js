var KmlViewerDemo;
(function (KmlViewerDemo) {
    "use strict";
    var latitude = 38;
    var longitude = -100;
    var zoom = 5;
    var map;
    var center;
    var canvas;
    var viewer;
    function init() {
        initMap();
    }
    KmlViewerDemo.init = init;
    function initMap() {
        center = new google.maps.LatLng(latitude, longitude);
        canvas = $("#map-canvas");
        map = new google.maps.Map(canvas.get(0), {
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
        viewer = new Google.Maps.KmlViewer(map);
    }
})(KmlViewerDemo || (KmlViewerDemo = {}));
