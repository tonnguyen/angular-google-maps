import { Component, EventEmitter, Input, NgZone, Output, ViewChild } from '@angular/core';
import { GoogleMapsAPIWrapper } from '../services/google-maps-api-wrapper';
import { Observable } from 'rxjs/Observable';
/**
 * AgmSearchBox allows to add a search box to the map
 *
 * ### Example
 *
 * ```
 * <agm-search-box [placeholder]="'Search'" [position]="ControlPosition.TOP_LEFT"
 *   (placesChange)="updateRef($event)"></agm-search-box>
 * ```
 *
 */
var AgmSearchBox = (function () {
    function AgmSearchBox(gmapsApi, _zone) {
        this.gmapsApi = gmapsApi;
        this._zone = _zone;
        /**
         * Will automatically center the map to the clicked result
         */
        this.autoBoundResults = true;
        /**
         * This event is fired when the user selects a query, will return the places matching that query.
         */
        this.placesChange = new EventEmitter();
    }
    /** @internal */
    AgmSearchBox.prototype.ngOnInit = function () {
        var _this = this;
        this.gmapsApi.getNativeMap().then(function (map) {
            _this.createEventObservable().subscribe(function () {
                _this.placesChange.emit(_this.getSearchBoxEl().getPlaces());
                if (_this.autoBoundResults) {
                    _this.autoBound();
                }
            });
        });
    };
    /** @internal */
    AgmSearchBox.prototype.createEventObservable = function () {
        var _this = this;
        return Observable.create(function (observer) {
            _this.getSearchBoxEl().addListener('places_changed', function (e) {
                _this._zone.run(function () { return observer.next(e); });
            });
        });
    };
    /** @internal */
    AgmSearchBox.prototype.ngOnChanges = function (changes) {
        var _this = this;
        this.gmapsApi.getNativeMap().then(function (map) {
            if (changes['bounds']) {
                _this.getSearchBoxEl().setBounds(_this.bounds);
            }
            if (changes['position']) {
                _this.updatePosition(_this.position);
            }
        });
    };
    /** @internal */
    AgmSearchBox.prototype.getSearchBoxEl = function () {
        if (this.searchBox === undefined) {
            this.searchBox = new google.maps.places.SearchBox(this.panel.nativeElement, {
                bounds: this.bounds
            });
        }
        return this.searchBox;
    };
    /** @internal */
    AgmSearchBox.prototype.updatePosition = function (position) {
        var _this = this;
        if (position) {
            this.gmapsApi.getControls().then(function (controls) {
                controls[position].push(_this.panel.nativeElement);
            });
        }
    };
    /** @internal */
    AgmSearchBox.prototype.autoBound = function () {
        var places = this.getSearchBoxEl().getPlaces();
        if (places.length === 0) {
            return;
        }
        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log('Place does not contain a geometry');
                return;
            }
            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            }
            else {
                bounds.extend(place.geometry.location);
            }
        });
        this.gmapsApi.fitBounds(bounds);
    };
    return AgmSearchBox;
}());
export { AgmSearchBox };
AgmSearchBox.decorators = [
    { type: Component, args: [{
                selector: 'agm-search-box',
                template: '<input type="text" class="search-box" #panel placeholder="{{placeholder}}">',
                styles: [
                    ".search-box {\n        background-color: #fff;\n        font-family: Roboto;\n        font-size: 15px;\n        font-weight: 300;\n        margin-left: 12px;\n        padding: 0 11px 0 13px;\n        text-overflow: ellipsis;\n        width: 300px;\n        margin-top: 10px;\n        height: 26px;\n      }\n\n      .search-box:focus {\n        border-color: #4d90fe;\n      }"
                ]
            },] },
];
/** @nocollapse */
AgmSearchBox.ctorParameters = function () { return [
    { type: GoogleMapsAPIWrapper, },
    { type: NgZone, },
]; };
AgmSearchBox.propDecorators = {
    'panel': [{ type: ViewChild, args: ['panel',] },],
    'placeholder': [{ type: Input },],
    'position': [{ type: Input },],
    'autoBoundResults': [{ type: Input },],
    'bounds': [{ type: Input },],
    'placesChange': [{ type: Output },],
};
//# sourceMappingURL=search-box.js.map