import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoginMode = true;
  error = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
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
    const endpoint = this.isLoginMode
      ? 'https://jsonplaceholder.typicode.com/posts'
      : 'https://jsonplaceholder.typicode.com/posts';
    this.http.post(endpoint, { username, password }).subscribe({
      next: (res: any) => {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', username);
        window.dispatchEvent(new StorageEvent('storage', { key: 'loggedIn', newValue: 'true' }));
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: () => {
        this.error = 'Failed to authenticate.';
        this.loading = false;
      },
    });
  }
}
