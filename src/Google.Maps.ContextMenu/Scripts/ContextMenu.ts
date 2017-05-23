module Google.Maps {

    "use strict";

    var templates = {
        contextMenu: `<div class="context-menu">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEXSURBVFhH7ZWxioNAEIY18dIYyYKNhY2FIIKNhU/gI1j5lr6BYGFtp3YWFja5Q0HQRD0PhoXjprhiSALZr9n5G/dnnH9WXtf1Kj2RA5xPQxgQBoQBdA9EUXTO8/wDJAm2bS9pmvYgOagBy7LYPM8ySDLatv2EkoMaSJLkVFXVESQJpmkucRzPIDliFb9mCvq+l4uiIJ0B13UXXdc3kBzUQBAEl31iSbujadpWluUXSA56yTiO5BGcpgmq36AdqOv62HUdqQnG2OZ53gKSI2L4mjHMskyhfox837+HYXgDyUENOI7DhmEgHUJFUaSmaf48RugvMAxjhZKMPQXoN9EO7JmVqWP4swVVVf3fJnwkIobCwLsbkKRvTQOBPiSeiucAAAAASUVORK5CYII=" />
    <ul class="context-menu-items"></ul>
</div>
`,
        contextMenuItem: `<li></li>`
    };

    export interface ContextMenuOptions {
        items?: string[];
        position?: google.maps.ControlPosition;
    }

    export class ContextMenu {

        _container: JQuery;
        _button: JQuery;
        _itemContainer: JQuery;

        constructor(map: google.maps.Map, options?: ContextMenuOptions) {

            options = options || {};
            options.items = options.items || [];
            options.position = options.position || google.maps.ControlPosition.LEFT_TOP;

            this._container = jQuery(templates.contextMenu);
            this._button = jQuery(this._container.find("img"));
            this._button.click(this.toggle.bind(this));
            this._itemContainer = this._container.find(".context-menu-items").hide();
            this.addItems(options.items);

            map.controls[options.position].push(this._container.get(0));
        }

        private toggle(): void {

            this._itemContainer.toggle();
        }

        addItems(items: string[]): JQuery[] {

            return items.map(this.addItem);
        }

        addItem(item: string): JQuery {

            return jQuery(templates.contextMenuItem)
                .append(item)
                .appendTo(this._itemContainer);;
        }
    }
}