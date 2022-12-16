import { Component } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from '@firebase/util';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage: string = '';

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
    private toastrService: ToastrService,
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
        this.toastrService.success(`Welcome back, ${email[0].toUpperCase() + email.slice(1)}!`);

      },
      error: (err)=> {
        const errorMessage = err.message;
        if(errorMessage == 'Firebase: Error (auth/wrong-password).' || errorMessage == 'Firebase: Error (auth/user-not-found).') {
              this.toastrService.error(`Incorrect email or password`)
        }
        
        this.loginFormGroup.controls['password'].setValue('');
      }
    });
  }
}
