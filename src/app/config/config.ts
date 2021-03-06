import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Locale } from '../locale/locale';

@Injectable()
export class Config {
    private config: Object = null;

    constructor(private http: Http, private locale: Locale) {
        locale.setLocale();
    }
    load() {
        return new Promise((resolve, reject) => {
            this.http.get('./app/config/config.json').map( res => res.json() ).catch((error: any):any => {
                console.log('Configuration file "config.json" could not be read');
                resolve(true);
                return Observable.throw(error.json().error || 'Server error');
            }).subscribe((responseData) => {
                this.config = responseData;
                resolve(true);
            });

        });
    }
    public getConfig(key: any) {
        return this.config[key].value;
    }
}
