import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  loggedIn = false;
  private storageListener: any;

  constructor(private router: Router, private ngZone: NgZone) {
    this.loggedIn = localStorage.getItem('loggedIn') === 'true';
  }

  ngOnInit() {
    this.storageListener = (event: StorageEvent) => {
      if (event.key === 'loggedIn') {
        this.ngZone.run(() => {
          this.loggedIn = localStorage.getItem('loggedIn') === 'true';
        });
      }
    };
    window.addEventListener('storage', this.storageListener);
  }

  logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    window.removeEventListener('storage', this.storageListener);
  }
}
