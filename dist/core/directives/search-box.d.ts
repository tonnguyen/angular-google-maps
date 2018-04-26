import { ElementRef, EventEmitter, NgZone, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { GoogleMapsAPIWrapper } from '../services/google-maps-api-wrapper';
import { ControlPosition, SearchBox, LatLngBounds, LatLngBoundsLiteral } from '../services/google-maps-types';
import { Observable } from 'rxjs/Observable';
import { PlaceResult } from '@agm/core/services/google-maps-types';
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
export declare class AgmSearchBox implements OnInit, OnChanges {
    private gmapsApi;
    private _zone;
    private searchBox;
    /**
     * @internal
     */
    panel: ElementRef;
    /**
     * Placeholder for the search box input
     */
    placeholder: string;
    /**
     * Position in which the control is going to placed
     * This input is required otherwise the box won't be added to the map
     */
    position: ControlPosition;
    /**
     * Will automatically center the map to the clicked result
     */
    autoBoundResults: boolean;
    /**
     * The area towards which to bias query predictions. Predictions are biased towards, but not restricted to, queries targeting these bounds.
     */
    bounds: LatLngBounds | LatLngBoundsLiteral;
    /**
     * This event is fired when the user selects a query, will return the places matching that query.
     */
    placesChange: EventEmitter<Array<PlaceResult>>;
    constructor(gmapsApi: GoogleMapsAPIWrapper, _zone: NgZone);
    /** @internal */
    ngOnInit(): void;
    /** @internal */
    createEventObservable<T>(): Observable<T>;
    /** @internal */
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    /** @internal */
    getSearchBoxEl(): SearchBox;
    /** @internal */
    updatePosition(position: ControlPosition): void;
    /** @internal */
    autoBound(): void;
}
