import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from '../interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  currentUser$: Observable<any> = this.authService.currentUser$;


  constructor(private authService: AuthService, private router: Router) {}


  logoutHandler() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
