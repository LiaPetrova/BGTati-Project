import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Util } from 'src/app/shared/util/util';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, 
    private router: Router,
    private util: Util
    ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn$.pipe(take(1), map(isLoggedIn => {
      if (isLoggedIn) {
        return true;
      }
      this.util.openFailureSnackBar('You need to be logged in to go there', 'dismiss');
      return this.router.createUrlTree(['/user/login'], {
        queryParams: {
          'redirect-to': '/' + state.url
        }
      });

    }));
  }
}

