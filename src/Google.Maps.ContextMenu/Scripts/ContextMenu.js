var Google;
(function (Google) {
    var Maps;
    (function (Maps) {
        "use strict";
        var templates = {
            contextMenu: "<div class=\"context-menu\">\n    <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEXSURBVFhH7ZWxioNAEIY18dIYyYKNhY2FIIKNhU/gI1j5lr6BYGFtp3YWFja5Q0HQRD0PhoXjprhiSALZr9n5G/dnnH9WXtf1Kj2RA5xPQxgQBoQBdA9EUXTO8/wDJAm2bS9pmvYgOagBy7LYPM8ySDLatv2EkoMaSJLkVFXVESQJpmkucRzPIDliFb9mCvq+l4uiIJ0B13UXXdc3kBzUQBAEl31iSbujadpWluUXSA56yTiO5BGcpgmq36AdqOv62HUdqQnG2OZ53gKSI2L4mjHMskyhfox837+HYXgDyUENOI7DhmEgHUJFUaSmaf48RugvMAxjhZKMPQXoN9EO7JmVqWP4swVVVf3fJnwkIobCwLsbkKRvTQOBPiSeiucAAAAASUVORK5CYII=\" />\n    <ul class=\"context-menu-items\"></ul>\n</div>\n",
            contextMenuItem: "<li></li>"
        };
        var ContextMenu = (function () {
            function ContextMenu(map, items, position) {
                if (items === void 0) { items = []; }
                if (position === void 0) { position = google.maps.ControlPosition.LEFT_TOP; }
                this._container = jQuery(templates.contextMenu);
                this._button = jQuery(this._container.find("img"));
                this._button.click(this.toggle.bind(this));
                this._itemContainer = this._container.find(".context-menu-items").hide();
                this.addItems(items || []);
                map.controls[position].push(this._container.get(0));
            }
            ContextMenu.prototype.toggle = function () {
                this._itemContainer.toggle();
            };
            ContextMenu.prototype.addItems = function (items) {
                return items.map(this.addItem);
            };
            ContextMenu.prototype.addItem = function (item) {
                return jQuery(templates.contextMenuItem)
                    .append(item)
                    .appendTo(this._itemContainer);
                ;
            };
            return ContextMenu;
        }());
        Maps.ContextMenu = ContextMenu;
    })(Maps = Google.Maps || (Google.Maps = {}));
})(Google || (Google = {}));
