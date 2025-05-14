import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MyListApiService } from '../../services/my-list-api.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    NgIf
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoginMode = true;
  error = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private myListApi: MyListApiService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = '';
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.error = '';
    const { username, password } = this.loginForm.value;

    if (this.isLoginMode) {
      // Login flow
      this.myListApi.login(username, password).subscribe(result => {
        if (result.success) {
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('username', username);
          window.dispatchEvent(new StorageEvent('storage', { key: 'loggedIn', newValue: 'true' }));
          this.router.navigate(['/']);
        } else {
          this.error = result.message;
        }
        this.loading = false;
      });
    } else {
      // Register flow
      this.myListApi.register(username, password).subscribe(result => {
        if (result.success) {
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('username', username);
          window.dispatchEvent(new StorageEvent('storage', { key: 'loggedIn', newValue: 'true' }));
          this.router.navigate(['/']);
        } else {
          this.error = result.message;
        }
        this.loading = false;
      });
    }
  }
}
