import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Util } from 'src/app/shared/util/util';
import { IUser } from '../interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  currentUser$: Observable<any> = this.authService.currentUser$;
  isHamburgerOpen: Boolean = false;


  constructor(private authService: AuthService, 
    private router: Router,
    private util: Util
    ) {}

    toggleHamburger () {
        this.isHamburgerOpen = !this.isHamburgerOpen;
    }


  logoutHandler() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
      this.util.openSuccessSnackBar('You\'re logged out.', 'dismiss');
    });
  }
}
