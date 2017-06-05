
module KmlViewerDemo {

    "use strict";

    var latitude: number = 38;
    var longitude: number = -100;
    var zoom: number = 5;
    var map: google.maps.Map;
    var center: google.maps.LatLng;

    var canvas: JQuery;

    var viewer: Google.Maps.KmlViewer;

    export function init(): void {

        initMap();
    }

    function initMap(): void {

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
}