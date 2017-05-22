module ContextMenuDemo {

    var latitude: number = 38;
    var longitude: number = -100;
    var zoom: number = 8;
    var map: google.maps.Map;
    var menu: Google.Maps.ContextMenu;
    var center: google.maps.LatLng;
    var canvas: Element;
    
    export function init(): void {

        initMap();
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
        menu = new Google.Maps.ContextMenu(map);
        menu.addItem("Say Hi").click(() => toastr.info("Hi"));
        menu.addItem("Say Hey").click(() => toastr.info("Hey"));;
        menu.addItem("Say Hello").click(() => toastr.info("Hello"));;
    }
}

declare var toastr: any;