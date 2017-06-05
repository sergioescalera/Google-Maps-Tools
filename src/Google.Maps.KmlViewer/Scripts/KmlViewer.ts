module Google.Maps {

    "use strict";

    declare var toastr: any;

    export class KmlViewer {

        private _map: google.maps.Map;
        private _optionsTemplate: JQuery;
        private _kmlItemTemplate: JQuery;
        private _options: JQuery;
        private _inputFile: JQuery;
        private _browse: JQuery;
        //private _nameInput: JQuery;
        private _urlInput: JQuery;
        private _pathInput: JQuery;
        private _importButton: JQuery;
        private _items: JQuery[];

        constructor(map: google.maps.Map) {

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

        private OpenFileDialog(): void {
            toastr.info("Not implemented");
            //this._inputFile.click();
        }

        private FileSelected(): void {

            var files = <FileList>this._inputFile.prop("files");

            if (files && files.length) {
                this._pathInput.val(files[0].name);
            }
        }

        private ImportData(): void {

            this.ImportFromUrl();
        }

        private ImportFromUrl(): void {

            var url = <string>this._urlInput.val();
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

                $(`<li class="divider" role="separator"></li>`).appendTo(container);
            }

            this._items.push(item);

            item.find("span")
                .text(name)
                .end()
                .find("input")
                .prop("checked", true)
                .change(() => {
                    if (item.find("input").prop("checked")) {
                        kml.setMap(this._map);
                    } else {
                        kml.setMap(null);
                    }
                })
                .end()
                .appendTo(container);
        }
    }
}