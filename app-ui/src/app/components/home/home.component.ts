import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsernameDialogComponent } from '../username-dialog/username-dialog.component'; // Adjust the path
import { HomeService } from './services/home.service';
import { StateService } from 'src/app/services/state.service';
import { User } from '../../../../../Shared/models/user.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private dialog: MatDialog, private homeService: HomeService, private stateService: StateService) {}

  users :User[] = [];

  userSubscription: Subscription = new Subscription;
  
  ngOnInit(): void {
    this.openUsernameDialog();
    this.userSubscription = this.homeService.getActiveUsers().subscribe((newUsers: User[]) => {
      this.users = newUsers;
    });
  }

  openUsernameDialog(): void {
    const dialogRef = this.dialog.open(UsernameDialogComponent, {
      width: '250px',
      data: { username: '' },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        try {
          this.stateService.setUsername(result.trim());
          this.users = [...this.users, { username: result }];

          await this.homeService.sendUser(this.users);
        } catch (error) {
          console.error('Error creating a new user:', error);
        }
      }
    });
  }
}
