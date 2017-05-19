module Google.Maps {

    "use strict";

    var templates: any = {
        ruler: () => `<div class='ruler-wrapper'>
            <label for='rulerToggle'>Measure distance</label><input id='rulerToggle' type='checkbox' /></div>`,
        rulerPopup: () => `<div class='ruler-popup-wrapper'>
                <div class='ruler-title'>Measure distance</div>
                <div class='ruler-instructions'>Click on the map to trace a path you want to measure</div>
                <div class='ruler-distance'>Total distance:
                    <span class='ruler-distance-miles'></span>
                    <span class='ruler-distance-km'></span></div>
            </div>`
    };

    export class Ruler {

        on: boolean;

        private _distances: number[];
        private _map: google.maps.Map;
        private _toggleControl: JQuery;
        private _popupControl: JQuery;
        private _distanceControl: JQuery;
        private _distanceMilesControl: JQuery;
        private _distanceKmControl: JQuery;
        private _tooltips: RulerTooltip[];
        private _poly: google.maps.Polyline;
        
        get poly() {

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
        }

        constructor(
            map: google.maps.Map,
            togglePosition: google.maps.ControlPosition = google.maps.ControlPosition.TOP_LEFT,
            popupPosition: google.maps.ControlPosition = google.maps.ControlPosition.BOTTOM_CENTER) {

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

        private AddPoint(ev: google.maps.MouseEvent): void {

            if (!this.on) {
                return;
            }

            var point = <any>ev.latLng;

            this.poly.getPath().push(point);
        }

        private CalculateDistance(): void {

            if (!this._poly) {
                return;
            }

            var path: any = this._poly.getPath();

            var locations: google.maps.LatLng[] = path.getArray();

            this._distances = [];

            var distance = 0;

            for (var i: number = 1; i < locations.length; i++) {

                var from = locations[i - 1];
                var to = locations[i];

                var km = google.maps.geometry.spherical.computeDistanceBetween(from, to) * 0.001;

                distance += km;

                this._distances.push(distance);
            }

            this.UpdateDistance();
        }

        private ClearTooltips(): void {

            if (this._tooltips) {
                this._tooltips.forEach((t: RulerTooltip) => t.setMap(null));
            }
            this._tooltips = [];
        }

        private Reset(): void {

            if (this._poly) {
                this._poly.setMap(null);
            }
            this._poly = null;
            this._distances = [];
            this.ClearTooltips();
        }

        private TogglePopup(): void {

            this._popupControl.toggle(100);
            this.on = !this.on;

            if (!this.on) {
                this.Reset();
                this.UpdateDistance();
            }
        }

        private UpdateDistance(): void {

            if (this._distances.length === 0) {
                this._distanceControl.hide();
            } else {
                this._distanceControl.show();
            }

            this.ClearTooltips();

            if (this._poly) {

                var path: any = this._poly.getPath();

                var locations: google.maps.LatLng[] = path.getArray();

                for (var i: number = 1; i < locations.length; i++) {

                    var location = locations[i];
                    var miles = this._distances[i - 1] * 0.62137119;
                    var text = `${miles.toFixed(2)} miles`;
                    var tooltip = new RulerTooltip(location, text, this._map);

                    this._tooltips.push(tooltip);
                }
            }

            var distance = this._distances.length > 0 ? this._distances[this._distances.length - 1] : 0;

            this._distanceKmControl.text(`(${distance.toFixed(2)} km)`);
            this._distanceMilesControl.text(`${(distance * 0.62137119).toFixed(2)} miles`);
        }
    }
}