import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthenticationRequest } from '../models/AuthenticationRequest';
import { Result } from '../models/Result';
import { url } from '../utils/constants'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {

  }


  checkAuth(data: AuthenticationRequest) {


    return this.http.post<Result>(url + '/authenticate', data);

  }

  isauthenticate() {

    let user = localStorage.getItem('token')
    return user!==null

  }

  private storageSub = new Subject<string>();
  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }
  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    this.storageSub.next('set');
  }
  removeItem(key: any) {
    localStorage.removeItem(key);
    this.storageSub.next('remove');
  }

}
