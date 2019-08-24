import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpIndicatorService {

  private onLoadingChangedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private requests: HttpRequest<any>[] = [];

  constructor() { }

  onStarted(req: HttpRequest<any>): void {
    this.requests.push(req);
    this.notify();
  }

  onFinished(req: HttpRequest<any>) {
    const index = this.requests.indexOf(req);
    if (index !== -1) {
      this.requests.splice(index, 1);
    }
    this.notify();
  }

  private notify() {
    this.onLoadingChangedSubject.next(this.requests.length !== 0);
  }

  get onLoadingChanged() {
    return this.onLoadingChangedSubject.pipe(
      distinctUntilChanged()
    );
  }
}
