module RulerDemo {

    var latitude: number = 38;
    var longitude: number = -100;
    var zoom: number = 8;
    var map: google.maps.Map;
    var center: google.maps.LatLng;
    var canvas: Element;
    var ruler: Google.Maps.Ruler;

    export function init(): void {

        initMap();

        initRuler();
    }

    function initMap(): void {
        
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

    function initRuler(): void {

        ruler = new Google.Maps.Ruler(map);
    }
}