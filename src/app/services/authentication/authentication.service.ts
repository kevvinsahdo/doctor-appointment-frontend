import { Injectable } from '@angular/core';
import ApiService from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private apiService: ApiService) { }

  async signUp(data) {
    await this.apiService.signUp(data);

    await this.signIn({
      email: data.email,
      password: data.password,
    })
  }

  async signIn(data) {
    const resp = await this.apiService.signIn(data);

    localStorage.setItem('user', JSON.stringify({ email: data.email, token: resp.headers.get('Authorization') }))
  }

  logOut() {
    localStorage.removeItem('user');
  }
}
