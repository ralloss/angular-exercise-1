import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserAPIList } from './user.interfaces';
import { delay } from 'rxjs';

const BASE_URL = 'https://codingfactory.ddns.net';
const USER_API = BASE_URL + '/api/user';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get<UserAPIList>(`${USER_API}/findAll`).pipe(delay(500));
  }

  findByUsername(username: string) {
    return this.http.get<User>(`${USER_API}/findOne/${username}`);
  }

  insertUser(user: User) {
    return this.http.post<User>(`${USER_API}/create`, user);
  }

  updateUser(user: User) {
    return this.http.patch<User>(`${USER_API}/update`, user);
  }

  deleteUser(username: string) {
    return this.http.delete<User>(`${USER_API}/delete/${username}`);
  }
}
