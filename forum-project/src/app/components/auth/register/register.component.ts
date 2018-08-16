import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RegisterModel } from '../../../core/models/auth/register.model';
import { AuthService } from '../../../core/services/auth/auth.service';
import { MatDialogRef } from '@angular/material';
import { compareValidator } from '../../../shared/validators/compare-validator.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  protected registerForm;

  constructor(protected fb: FormBuilder, public dialogRef: MatDialogRef<RegisterComponent>) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, compareValidator('password')]]
    });
  }

  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  onNoClick(): void {
    this.dialogRef.close();
  }

  register(): void {
    console.log('asdf');
  }

}
