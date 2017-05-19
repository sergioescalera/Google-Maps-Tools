module Google.Maps {

    "use strict";

    var template = "<div class='ruler-tooltip'></div>";

    export class RulerTooltip extends google.maps.OverlayView {

        private _container: JQuery;
        private _location: google.maps.LatLng;
        private _text: string;

        constructor(location: google.maps.LatLng, text: string, map: google.maps.Map) {

            super();

            this._location = location;
            this._text = text;

            this.setMap(map);
        }

        draw(): void {
            
            var projection = this.getProjection();

            var position = projection.fromLatLngToDivPixel(this._location);
            var css = {
                left: `${position.x}px`,
                top: `${position.y}px`
            };
            console.log(css);
            this._container.css(css);
        }

        onAdd(): void {

            this._container = jQuery(template).html(this._text);

            this.getPanes().overlayLayer.appendChild(this._container.get(0));
        }

        onRemove(): void {

            if (this._container) {
                this._container.remove();
            }
        }
    }
}