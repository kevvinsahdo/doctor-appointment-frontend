import { Injectable } from '@angular/core';
import ApiService from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private apiService: ApiService) { }

  async signIn(data) {
    await this.apiService.signIn(data);

    await this.signUp({
      email: data.email,
      password: data.password,
    })
  }

  async signUp(data) {
    const resp = await this.apiService.signUp(data);

    localStorage.setItem('user', JSON.stringify({ email: data.email, token: resp.headers.get('Authorization') }))
  }

  logOut() {
    localStorage.removeItem('user');
  }
}
