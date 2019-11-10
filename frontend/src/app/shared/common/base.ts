import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

const YEAR_FORMAT = 'yyyy';
const MONTH_FORMAT = 'MM';
const DAY_FORMAT = 'dd';
const HOUR_FORMAT = 'HH';
const MINUTE_FORMAT = 'mm';
const SECONDS_FORMAT = 'ss';
const MILLIS_FORMAT = 'SSS';

export const DATE_FORMAT = `${YEAR_FORMAT}-${MONTH_FORMAT}-${DAY_FORMAT}`;
export const BR_DATE_FORMAT = `${DAY_FORMAT}/${MONTH_FORMAT}/${YEAR_FORMAT}`;

export abstract class Base implements OnDestroy {     
    
    private endSubject = new Subject<boolean>();

    ngOnDestroy() {
        this.endSubject.next(true);
        this.endSubject.complete();
    }

    protected isNumber(value: string | number) {
        return (value && !isNaN(Number(value)));
    }

    protected isNumberOrNull(value: string | number) {
        return !value || this.isNumber(value);
    }

    protected getNumber(value: string | number) {
        if(!value)
            return value;
        
        return Number(value);
    }

    protected buildMap(value: any, key?: string): Map<string, any> {
        if(!value || typeof value !== 'object')
            return new Map<string, any>();

        return Object.keys(value).reduce((map, k) => {
            const v = value[k];

            if(typeof v === 'function')
                return map;

            if(typeof v === 'object')
                return new Map([...Array.from(map.entries()), ...Array.from(this.buildMap(v, k).entries())])
            
            return map.set(!!key ? `${key}.${k}` : k, v);
        }, new Map<string, any>());
    }

    protected getDate(date: string) {
        return this._getDate(date, /^(\d{4})\-(\d{2})\-(\d{2})$/g, DATE_FORMAT);
    }

    private _getDate(date: string, regex: any, format: string) {
        if(!date || !regex || !format || typeof date !== 'string' || typeof format !== 'string' || !date.trim().match(regex))
            return date;
       
        const dateMap = this.getDateMap(date.trim(), format);
        if(!dateMap)
            return date;
        
        return new Date(
            dateMap.get(YEAR_FORMAT), 
            dateMap.get(MONTH_FORMAT) - 1, 
            dateMap.get(DAY_FORMAT), 
            dateMap.get(HOUR_FORMAT), 
            dateMap.get(MINUTE_FORMAT), 
            dateMap.get(SECONDS_FORMAT), 
            dateMap.get(MILLIS_FORMAT)
        );
    }

    private getDateMap(date: string, format: string) {
        if(!date || !format || typeof date !== 'string' || typeof format !== 'string')
            return undefined;

        let dateMap = new Map<string, number>();
        dateMap.set(YEAR_FORMAT, 0);
        dateMap.set(MONTH_FORMAT, 0);
        dateMap.set(DAY_FORMAT, 0);
        dateMap.set(HOUR_FORMAT, 0);
        dateMap.set(MINUTE_FORMAT, 0);
        dateMap.set(SECONDS_FORMAT, 0);
        dateMap.set(MILLIS_FORMAT, 0);

        const dateSplited = date.split(/\W/g).map(value => Number(value));
        const formatSplited = format.split(/\W/g);

        if(dateSplited.length != formatSplited.length)
            return undefined;

        let count = 0;
        dateMap = formatSplited.reduce((map, key) => map.set(key, dateSplited[count++]), dateMap);

        return dateMap;
    } 

    protected getFormattedDate(date: Date) {
        if(!date || typeof date !== 'object')
            return date;

        return this.formatDate(date, DATE_FORMAT);
    }

    private formatDate(date: Date, format: string, utc?: boolean) {
        if(!date || !format || typeof date !== 'object' || typeof format !== 'string')
            return date;

        const MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
        const ii = (i: number, len?: number) => {
            var s = i + "";
            len = len || 2;
            while (s.length < len) s = "0" + s;
            return s;
        }
    
        const y = utc ? date.getUTCFullYear() : date.getFullYear();
        format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
        format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
        format = format.replace(/(^|[^\\])y/g, "$1" + y);
    
        const M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
        format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
        format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
        format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
        format = format.replace(/(^|[^\\])M/g, "$1" + M);
    
        const d = utc ? date.getUTCDate() : date.getDate();
        format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
        format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
        format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
        format = format.replace(/(^|[^\\])d/g, "$1" + d);
    
        const H = utc ? date.getUTCHours() : date.getHours();
        format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
        format = format.replace(/(^|[^\\])H/g, "$1" + H);
    
        const h = H > 12 ? H - 12 : H == 0 ? 12 : H;
        format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
        format = format.replace(/(^|[^\\])h/g, "$1" + h);
    
        const m = utc ? date.getUTCMinutes() : date.getMinutes();
        format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
        format = format.replace(/(^|[^\\])m/g, "$1" + m);
    
        const s = utc ? date.getUTCSeconds() : date.getSeconds();
        format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
        format = format.replace(/(^|[^\\])s/g, "$1" + s);
    
        let f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
        format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
        f = Math.round(f / 10);
        format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
        f = Math.round(f / 10);
        format = format.replace(/(^|[^\\])f/g, "$1" + f);
    
        const T = H < 12 ? "AM" : "PM";
        format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
        format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));
    
        const t = T.toLowerCase();
        format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
        format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));
    
        let tz = -date.getTimezoneOffset();
        let K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
        if (!utc) {
            tz = Math.abs(tz);
            const tzHrs = Math.floor(tz / 60);
            const tzMin = tz % 60;
            K += ii(tzHrs) + ":" + ii(tzMin);
        }
        format = format.replace(/(^|[^\\])K/g, "$1" + K);
    
        const day = (utc ? date.getUTCDay() : date.getDay()) + 1;
        format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
        format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);
    
        format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
        format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);
    
        format = format.replace(/\\(.)/g, "$1");
    
        return format;
    };
    
    getFormattedDatePhoneNumber(phoneNumber: string) {
        const REGEX = /^\((\d{2})\)\s(\d{4,5})\-(\d{4})$/g;
        if(!phoneNumber || typeof phoneNumber !== 'string' || !phoneNumber.trim().match(REGEX)) 
            return phoneNumber;
         
        return phoneNumber.trim().replace(REGEX, '$1$2$3');
    }

    protected get end$() {
        return this.endSubject.pipe(
            filter(end => end)
        );
    }

    get tooltipDelay() {
        return 1000;
    }
}
