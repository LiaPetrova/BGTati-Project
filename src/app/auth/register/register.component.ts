import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Util } from 'src/app/shared/util/util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }

  passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  registerFormGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    passwords: new FormGroup({
      password: this.passwordControl,
      repassword: new FormControl('', [Validators.required, passwordsMatch(this.passwordControl)])
    })
  });

  showErrorInControl(controlName: string, sourceGroup: FormGroup = this.registerFormGroup) {
    return sourceGroup.controls[controlName].touched && sourceGroup.controls[controlName].invalid;
  }
  

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private util: Util
  ) { }

  ngOnInit(): void {
  }

  handleRegister(): void {
    const { email, passwords: {password} } = this.registerFormGroup.value;

    this.authService.register$(email, password).subscribe({
      next: user => {
        this.router.navigate(['/home']);
        this.util.openSuccessSnackBar(`Welcome, ${email}!`, 'dismiss');

      },
      error: (err)=> {
        const errorMessage = err.message;
        if(errorMessage == 'Firebase: Error (auth/email-already-in-use).') {
          this.util.openFailureSnackBar(`Email: ${email} is already taken!`, 'dismiss');
          
        }        
      }
    });
    this.registerFormGroup.reset();
  }

}

export function passwordsMatch(passwordFormControl: AbstractControl) {

  const validatorFn: ValidatorFn =  (repasswordFormControl: AbstractControl) => {
      if(passwordFormControl.value !== repasswordFormControl.value) {
          return {
              passwordMatch: true
          };
      }
      return null;
  }

  return validatorFn;
}