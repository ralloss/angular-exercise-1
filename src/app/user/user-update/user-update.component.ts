import { Component, OnDestroy, OnInit } from '@angular/core';
import { User, UserAPI } from '../user.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
})
export class UserUpdateComponent implements OnInit, OnDestroy {
  private fetchSubscription: Subscription | undefined;
  private updateSubscription: Subscription | undefined;
  private username: string | null = null;
  user: User | undefined;
  error: string | undefined;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    if (this.username) this.fetchUserByUsername(this.username);
    else this.error = 'Username not provided.';
  }

  fetchUserByUsername(username: string) {
    this.fetchSubscription = this.userService
      .findByUsername(username)
      .subscribe((resp: UserAPI) => {
        if (resp.status && resp.data !== null) {
          this.user = resp.data;
          this.error = undefined;
        } else this.error = 'Could not find user';
      });
  }

  update(user: User) {
    user.username = this.username!;
    this.updateSubscription = this.userService
      .updateUser(user)
      .subscribe((resp: UserAPI) => {
        if (resp.status) {
          console.log('user updated!', resp);
          this.router.navigate(['/user/list'], { replaceUrl: true });
        } else {
          console.log('Could not find user');
        }
      });
  }

  ngOnDestroy(): void {
    this.fetchSubscription?.unsubscribe();
    this.updateSubscription?.unsubscribe();
  }
}
