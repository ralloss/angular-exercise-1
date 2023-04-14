import { Component, OnDestroy } from '@angular/core';
import { User } from '../user.interfaces';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-insert',
  templateUrl: './user-insert.component.html',
  styleUrls: ['./user-insert.component.css'],
})
export class UserInsertComponent implements OnDestroy {
  private subscription: Subscription | undefined;

  constructor(private service: UserService) {}

  insert(user: User) {
    this.subscription = this.service.insertUser(user).subscribe((response) => {
      console.log(response);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
