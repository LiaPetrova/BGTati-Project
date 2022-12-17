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
    'email': new FormControl('', [Validators.required]),
    'password': new FormControl('', [Validators.required ])
  });

  showErrorInControl(controlName: string, sourceGroup: FormGroup = this.loginFormGroup) {
    return sourceGroup.controls[controlName].touched && sourceGroup.controls[controlName].invalid;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private util: Util,
    ) { }

  ngOnInit(): void {
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
        if(errorMessage == 'Firebase: Error (auth/wrong-password).' || 
        errorMessage == 'Firebase: Error (auth/user-not-found).' ||
        errorMessage == 'Firebase: Error (auth/invalid-email).') {
            this.util.openFailureSnackBar(`Incorrect email or password!`, 'try again')
        }
        
        this.loginFormGroup.controls['password'].setValue('');
      }
    });
  }
}
