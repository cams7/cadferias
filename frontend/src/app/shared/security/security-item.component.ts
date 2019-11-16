import { Component, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { BaseSecurityItem } from './base-security-item';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'security-item',
  template: `
    <ng-content *ngIf="!disabled && (showItem$ | async)"></ng-content>
  `,
  styles: []
})
export class SecurityItemComponent extends BaseSecurityItem implements AfterViewInit {
   
  @Output() showItem = new EventEmitter();
  
  constructor(
    protected authService: AuthService
  ) { 
    super(authService);
  }

  ngAfterViewInit() {
    this.disableOrEnable(super.disabled);
  }

  protected disableOrEnable(disabled: boolean) {
    if(disabled) {
      this.showItem.emit(false);  
    } else {
      if(this.roles) {
        this.showItem$.pipe(
          take(1)
        ).subscribe(showItem => {
          this.showItem.emit(showItem);
        });
      } else {
        this.showItem.emit(true);
      }
    }
  }

}
