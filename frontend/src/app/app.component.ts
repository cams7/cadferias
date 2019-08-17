import { Component, OnInit, OnDestroy } from '@angular/core';

import { AppEventsService } from './shared/events.service';
import { AuthService } from './shared/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private eventsService: AppEventsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.loadTokenData();
    //FIXME Remove the line below when the app development phase is over
    this.eventsService.resetAllSearchs();
  }

  ngOnDestroy() {
    this.authService.signOut();
    this.eventsService.endAllEvents();
  }

}
