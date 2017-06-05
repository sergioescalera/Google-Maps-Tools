var Google;
(function (Google) {
    var Maps;
    (function (Maps) {
        "use strict";
        var KmlViewer = (function () {
            function KmlViewer(map) {
                this._map = map;
                this._optionsTemplate = $("#options-template");
                this._kmlItemTemplate = $("#kml-item-template");
                this._options = $(this._optionsTemplate.html());
                this._map.controls[google.maps.ControlPosition.TOP_LEFT].push(this._options.get(0));
                this._inputFile = $("#input-file");
                this._inputFile.change(this.FileSelected.bind(this));
                this._browse = $("#browse");
                this._browse.click(this.OpenFileDialog.bind(this));
                //this._nameInput = $("#name");
                this._urlInput = $("#url");
                this._pathInput = $("#path");
                this._importButton = $("#import");
                this._importButton.click(this.ImportData.bind(this));
                this._items = [];
            }
            KmlViewer.prototype.OpenFileDialog = function () {
                toastr.info("Not implemented");
                //this._inputFile.click();
            };
            KmlViewer.prototype.FileSelected = function () {
                var files = this._inputFile.prop("files");
                if (files && files.length) {
                    this._pathInput.val(files[0].name);
                }
            };
            KmlViewer.prototype.ImportData = function () {
                this.ImportFromUrl();
            };
            KmlViewer.prototype.ImportFromUrl = function () {
                var _this = this;
                var url = this._urlInput.val();
                var name = url.substr(url.lastIndexOf("/") + 1);
                this._urlInput.val("");
                if (!url) {
                    return;
                }
                var kml = new google.maps.KmlLayer({
                    url: url,
                    clickable: true,
                    map: this._map,
                    preserveViewport: true,
                    suppressInfoWindows: false
                });
                var item = $(this._kmlItemTemplate.html());
                var container = this._options.find("ul");
                if (this._items.length === 0) {
                    $("<li class=\"divider\" role=\"separator\"></li>").appendTo(container);
                }
                this._items.push(item);
                item.find("span")
                    .text(name)
                    .end()
                    .find("input")
                    .prop("checked", true)
                    .change(function () {
                    if (item.find("input").prop("checked")) {
                        kml.setMap(_this._map);
                    }
                    else {
                        kml.setMap(null);
                    }
                })
                    .end()
                    .appendTo(container);
            };
            return KmlViewer;
        }());
        Maps.KmlViewer = KmlViewer;
    })(Maps = Google.Maps || (Google.Maps = {}));
})(Google || (Google = {}));
