import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DaoService {
  private isUserLoggedIn: boolean;

  constructor(private http: HttpClient) {}

  public get userStatus(): boolean {
    return this.isUserLoggedIn;
  }

  public getUsers(page: number): Observable<any> {
    return this.get(`users?page=${page}`).pipe(map(response => response.data));
  }

  public login(email: string, password: string): Observable<boolean> {
    return this.post('login', { email: email, password: password }).pipe(
      map(response => {
        if (Object.keys(response).includes('token')) {
          this.isUserLoggedIn = true;
          return true;
        } else {
          return false;
        }
      })
    );
  }

  private get(url: string): Observable<any> {
    return this.http.get(environment.serverUrl + url);
  }

  private post(url: string, body: any): Observable<any> {
    return this.http.post(environment.serverUrl + url, {
      ...body
    });
  }
}
