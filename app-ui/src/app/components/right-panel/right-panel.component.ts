import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../Shared/models/user.model';
import { Subscription } from 'rxjs';
import { ActiveUserService } from './services/active-user.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {

  users: User[] = [];
  username: string = ''; 

  userSubscription: Subscription = new Subscription;
  usernameSubscription: Subscription = new Subscription; 

  constructor(private activeUserService: ActiveUserService, private stateService: StateService) { }

  ngOnInit(): void {
    this.userSubscription = this.activeUserService.getActiveUsers().subscribe((newUsers: User[]) => {
      this.users = newUsers;
    });
    
    this.usernameSubscription = this.stateService.getUsername().subscribe(username => {
      this.username = username;
    });
  }

  ngOnDestroy(): void {
    this.usernameSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
