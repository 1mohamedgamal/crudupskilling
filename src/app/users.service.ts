import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'https://dummyapi.io/data/v1';

  constructor(private _https: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'app-id': '64fc4a747b1786417e354f31',
    });
    return headers;
  }

  addUser(User: any): Observable<any> {
    const headers = this.getHeaders();
    return this._https.post(`${this.apiUrl}/user/create`, User, { headers });
  }

  getAllUsers(): Observable<any> {
    const headers = this.getHeaders();
    return this._https.get(`${this.apiUrl}/user`, { headers });
  }

  deleteUser(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this._https.delete(`${this.apiUrl}/user/${id}`, { headers });
  }

  UpdateUser(user: any, id: string): Observable<any> {
    const headers = this.getHeaders();
    return this._https.put(`${this.apiUrl}/user/${id}`, user, { headers });
  }
  getUserById(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this._https.get(`${this.apiUrl}/user/${id}`, { headers });
  }
}
