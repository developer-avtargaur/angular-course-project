import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RegisterModel } from '../../models/auth/register.model';
import { LoginModel } from '../../models/auth/login.model';
import { AppState } from '../../store/app.state';
import { Store, select } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Logout } from '../../store/auth/auth.actions';

const loginUrl = 'http://localhost:5000/auth/login';
const registerUrl = 'http://localhost:5000/auth/signup';

@Injectable()
export class AuthService {
  private isAuthenticate: boolean;
  private isUserAdmin: boolean;
  private username: string;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private store: Store<AppState>, private cookieService: CookieService) {
      this.store.pipe(select(s => s.auth.auth))
      .subscribe(auth => {
          this.isAuthenticate = auth.isLoggedIn;
          this.isUserAdmin = auth.isAdmin;
          this.username = auth.username;
      });
  }

  register(body: RegisterModel) {
    return this.http.post(registerUrl, body);
  }

  login(body: LoginModel) {
    return this.http.post(loginUrl, body);
  }

  logout() {
    this.cookieService.delete('token');
    this.store.dispatch(new Logout());
    this.toastr.success('Logout successful!');
    this.router.navigate(['/home']);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticate;
  }

  isAdmin(): boolean {
    return this.isUserAdmin;
  }

  get userName() {
    return this.username;
  }
}
