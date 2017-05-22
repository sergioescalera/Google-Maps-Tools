var ContextMenuDemo;
(function (ContextMenuDemo) {
    var latitude = 38;
    var longitude = -100;
    var zoom = 8;
    var map;
    var menu;
    var center;
    var canvas;
    function init() {
        initMap();
    }
    ContextMenuDemo.init = init;
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
        menu = new Google.Maps.ContextMenu(map);
        menu.addItem("Say Hi").click(function () { return toastr.info("Hi"); });
        menu.addItem("Say Hey").click(function () { return toastr.info("Hey"); });
        ;
        menu.addItem("Say Hello").click(function () { return toastr.info("Hello"); });
        ;
    }
})(ContextMenuDemo || (ContextMenuDemo = {}));
