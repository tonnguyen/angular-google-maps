import { Inject, Injectable, InjectionToken } from '@angular/core';
import { LazyMapsAPILoader, LazyMapsAPILoaderConfigLiteral } from './lazy-maps-api-loader';
import { DocumentRef, WindowRef } from '../../utils/browser-globals';

/**
 * Token for the config of the DelayedConfigMapsApiLoader. Please provide a function which
 * returns an object of type {@link LazyMapsAPILoaderConfig}.
 */
export const LAZY_MAPS_API_CONFIG_FUNCTION = new InjectionToken<() => LazyMapsAPILoaderConfigLiteral>('angular-google-maps LAZY_MAPS_API_CONFIG_FUNCTION');

@Injectable()
export class DelayedConfigMapsApiLoader extends LazyMapsAPILoader {
    constructor(@Inject(LAZY_MAPS_API_CONFIG_FUNCTION) private _configFn: () => LazyMapsAPILoaderConfigLiteral, w: WindowRef, d: DocumentRef) {
        super(null, w, d);
        this._config = null;
    }

    protected _getScriptSrc(callbackName: string): string {
        if (!this._config) {
            this._config = this._configFn();
        }
        return super._getScriptSrc(callbackName);
    }
}
