import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserAPI, UserAPIList } from './user.interfaces';
import { delay } from 'rxjs';
import { BASE_URL } from '../app.config';

const USER_API = BASE_URL + '/api/user';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get<UserAPIList>(`${USER_API}/findAll`).pipe(delay(500));
  }

  findByUsername(username: string) {
    return this.http.get<UserAPI>(`${USER_API}/findOne/${username}`);
  }

  insertUser(user: User) {
    return this.http.post<UserAPI>(`${USER_API}/create`, user);
  }

  updateUser(user: User) {
    return this.http.patch<UserAPI>(`${USER_API}/update`, user);
  }

  deleteUser(username: string) {
    return this.http.delete<UserAPI>(`${USER_API}/delete/${username}`);
  }
}
