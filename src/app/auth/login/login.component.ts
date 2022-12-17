import { Component } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from '@firebase/util';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Util } from 'src/app/shared/util/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  loginFormGroup: FormGroup = this.formBuilder.group({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  showErrorInControl(controlName: string, sourceGroup: FormGroup = this.loginFormGroup) {
    return sourceGroup.controls[controlName].touched && sourceGroup.controls[controlName].invalid;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public util: Util,
    public _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
  }


  openSuccessSnackBar(message: string, action: string){
    this._snackBar.open(message, action, {
      duration: 3000, horizontalPosition: 'end', verticalPosition: 'top',
      panelClass: ['green-snackbar'],
     });
    }

  openFailureSnackBar(message: string, action: string){
  this._snackBar.open(message, action, {
    duration: 3000, horizontalPosition: 'end', verticalPosition: 'top',
    panelClass: ['red-snackbar']
    });
  }

  handleLogin(): void {
    const { email, password } = this.loginFormGroup.value;
    this.authService.login$(email, password).subscribe({
      next: user => {
        if(this.activatedRoute.snapshot.queryParams['redirect-to']) {
          this.router.navigateByUrl(this.activatedRoute.snapshot.queryParams['redirect-to']);
        } else {
          this.router.navigate(['/home']);
        }
        this.util.openSuccessSnackBar(`Welcome back, ${email[0].toUpperCase() + email.slice(1)}!`, 'dismiss')
      },
      error: (err)=> {
        const errorMessage = err.message;
        if(errorMessage == 'Firebase: Error (auth/wrong-password).' || errorMessage == 'Firebase: Error (auth/user-not-found).') {
              this.openFailureSnackBar(`Incorrect email or password!`, 'try again')
            
        }
        
        this.loginFormGroup.controls['password'].setValue('');
      }
    });
  }
}
