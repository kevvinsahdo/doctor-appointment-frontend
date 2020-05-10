import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Logs } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public async getDoctors() {
    return this.httpClient.get<Array<any>>(this.SERVER_URL + '/doctors').toPromise();
  }

  public async createDoctor(body: Object) {
    return this.httpClient.post(this.SERVER_URL + '/doctors', body).toPromise();
  }

  public async getAppointments() {
    return this.httpClient.get<Array<any>>(this.SERVER_URL + '/appointments').toPromise();
  }

  public async createAppointment(body: Object) {
    return this.httpClient.post(this.SERVER_URL + '/appointments', body).toPromise();
  }

  public async signIn(body: Object) {    
    return this.httpClient.post(this.SERVER_URL + '/users/signIn', body).toPromise();
  }

  public async signUp(body: Object) {
    return this.httpClient.post(this.SERVER_URL + '/login', body, { observe: 'response'}).toPromise();
  }
}

export default ApiService;