import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  
  private _urls: LocationURL[] = [];

  private isUnchangedPageSubject = new Subject<boolean>();

  private _isForward = false;

  constructor(
    private location: Location
  ) {}

  init() {
    this.location.onUrlChange((url: string, state: LocationState) => {
      if(state) {          
        if(!this._isForward && url.match(/^\/\w+\?page\=\d+\&itemsPerPage\=\d+\&sort\=\w+\&order\=(ASC|DESC)$/g))
          this.clearURLs();
        
        if(!this._urls.some(l => l.state.navigationId == state.navigationId)) 
          this._urls.push(<LocationURL>{url: url.replace(/^\#\//g, '/'), state: state}); 
                
        if(this._isForward) {
          this._isForward = false;
          const locationURL = this.getURLByIndex(this.totalURLs - 2);
          this.location.replaceState(locationURL.url, undefined, locationURL.state);          
        }
      }
    });

    this.location.subscribe(next => {
      const state:LocationState = next.state;
      if(state) {
        const url = [...this._urls];     
        this._urls = this.isURLFound(next.url, this.totalURLs - 2) ?
          this._urls.filter(l => l.state.navigationId < state.navigationId) :
          this._urls.filter(l => l.state.navigationId != state.navigationId);
        
        this.isUnchangedPage$.subscribe(_ => this._urls = url);        
      }
    });
  }

  clearURLs() {
    this._urls = [];
  }

  back() {
    this.location.back();
  }

  forward() {
    this.location.forward();
  }

  hasPrevious(previousUrl: string, currentUrl: string) {
    if(this.isEmptyOrSingle)
      return false;
    
    const previousUrlIndex = this.getIndex(previousUrl);
    if(previousUrlIndex < 0)
      return false;
    
    const currentUrlIndex = this.getIndex(currentUrl);
    const hasPrevious = (previousUrlIndex + 1) == currentUrlIndex;
    return hasPrevious;
  }

  private isURLFound(url: string, index: number) {
    if(this.isEmpty)
      return false;

    const urlIndex = this.getIndex(url);
    const urlFound = urlIndex == index;
    return urlFound;
  }

  private getIndex(url: string) {
    const navigationId = Math.max(...this._urls.filter(l => l.url == url).map(l => l.state.navigationId), 0);
    const index = this._urls.findIndex(l => l.state.navigationId === navigationId);
    return index;
  }

  private getURLByIndex(index: number) {
    return this._urls[index];
  }

  private get isEmpty() {
    return this.totalURLs < 1;
  }

  private get isSingle() {
    return this.totalURLs == 1;
  }

  get totalURLs() {
    return this._urls.length;
  }

  get isEmptyOrSingle() {
    return this.isEmpty || this.isSingle;   
  }

  get urls() {
    return this._urls;
  }

  set isUnchangedPage(isUnchangedPage: boolean) {
    this.isUnchangedPageSubject.next(isUnchangedPage);
  }

  get isUnchangedPage$() {
    return this.isUnchangedPageSubject.pipe(
      take(1),
      filter(isUnchangedPage => isUnchangedPage)
    );
  }

  set isForward(isForward: boolean) {
    this._isForward = isForward;
  }
}

interface LocationState {
  navigationId : number;
}

interface LocationURL {
  url: string;
  state: LocationState;
}