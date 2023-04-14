import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { User, UserAPI, UserAPIList } from '../user.interfaces';
import { Subscription } from 'rxjs';
import { orderBy } from 'lodash-es';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService, private router: Router) {}

  loading = false;
  userList: User[] = [];
  private fetchSubscription: Subscription | undefined;
  private deleteSubscription: Subscription | undefined;

  usernameSortType: 'asc' | 'desc' = 'asc';
  firstNameSortType: 'asc' | 'desc' = 'asc';
  lastNameSortType: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    console.log('Starting "findall" API call');
    this.loading = true;
    this.fetchSubscription = this.userService.findAll().subscribe({
      next: (apiData: UserAPIList) => {
        const { status, data } = apiData;
        this.userList = data;
        console.log(status, data);
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
      },
      complete: () => {
        this.loading = false;
        console.log('API call completed');
      },
    });
  }

  handleDelete(user: User) {
    if (
      confirm(`Are you sure that you want to delete user "${user.username}"?`)
    )
      this.delete(user.username);
  }

  handleUpdate(user: User) {
    this.router.navigate(['/user/update/' + user.username]);
  }

  private delete(username: string) {
    this.deleteSubscription = this.userService.deleteUser(username).subscribe({
      next: (apiData: UserAPI) => {
        const { status, data } = apiData;
        console.log(status, data);
        if (status) {
          this.userList = this.userList.filter((u) => u.username !== username);
        } else {
          console.log('Could not delete user');
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('API delete call completed');
      },
    });
  }

  toggleSort(key: string) {
    switch (key) {
      case 'username':
        this.usernameSortType =
          this.usernameSortType === 'asc' ? 'desc' : 'asc';
        this.userList = orderBy(this.userList, [key], [this.usernameSortType]);
        break;
      case 'name':
        this.firstNameSortType =
          this.firstNameSortType === 'asc' ? 'desc' : 'asc';
        this.userList = orderBy(this.userList, [key], [this.firstNameSortType]);
        break;
      case 'surname':
        this.lastNameSortType =
          this.lastNameSortType === 'asc' ? 'desc' : 'asc';
        this.userList = orderBy(this.userList, [key], [this.lastNameSortType]);
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.fetchSubscription?.unsubscribe();
    this.deleteSubscription?.unsubscribe();
  }
}
