import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, OnDestroy {
 
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  logout() {
    this.authService.signOut();
    this.router.navigate(['/home']);
  }

  get isLoggedIn$() {
    return this.authService.loggedIn$;
  }

}
