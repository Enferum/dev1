import {Injectable} from "@angular/core";
import {CoreModule} from '../core.module';

@Injectable({
    providedIn: CoreModule,
})
export class LocalStorage {

    /**
     * JS LocalStorage instance.
     */
    private storage;

    /**
     * LocalStorage Constructor.
     */
    constructor() {
        if (this.localStorageAvailable()) {
            this.storage = localStorage;
        } else {
            this.storage = null;
        }
    }

    /**
     * Retrieve specified item from local storage.
     */
    public get<T>(key: string, defaultValue?: T): any|T {
        if ( ! this.storage) return defaultValue;

        let value;
        try { value = JSON.parse(this.storage.getItem(key)) } catch(e) {}

        return value == null ? defaultValue : value;
    }

    /**
     * Store specified item in local storage.
     */
    public set(key: string, value: any) {
        if ( ! this.storage) return null;
        this.storage.setItem(key, JSON.stringify(value));
    }

    /**
     * Remove specified item from local storage.
     */
    public remove(key: string) {
        if ( ! this.storage) return null;
        this.storage.removeItem(key);
    }

    /**
     * Check if local storage is available.
     */
    public localStorageAvailable(): boolean {
        let test = 'test';

        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch(e) {
            return false;
        }
    }
}