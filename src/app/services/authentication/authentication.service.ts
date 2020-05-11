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
    try {
      const resp = await this.apiService.signIn(data);
      localStorage.setItem('user', JSON.stringify({ email: data.email, token: resp.headers.get('Authorization') }))
    } catch (error) {
      throw error;
    }
  }

  logOut() {
    localStorage.removeItem('user');
  }
}
