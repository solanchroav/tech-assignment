import { Component, OnInit } from '@angular/core';
import { FeedService } from '../canvas/services/feed.service'
import { Subscription } from 'rxjs';
import { Post } from '../../../../../Shared/models/post.model';
import { ChatService } from '../left-panel/services/chat.service';
import { Message } from '../../../../../Shared/models/message.model';
import { ActiveUserService } from '../right-panel/services/active-user.service';
import { User } from '../../../../../Shared/models/user.model';
@Component({
  selector: 'app-console-logs',
  templateUrl: './console-logs.component.html',
  styleUrls: ['./console-logs.component.scss']
})
export class ConsoleLogsComponent implements OnInit {
  
  messages: any[] = [];
  createPostSubscription: Subscription = new Subscription;
  getAllPostSubscription: Subscription = new Subscription;
  postWebSocketSubscription: Subscription = new Subscription;
  chatWebSocketSubscription: Subscription = new Subscription;
  activeUserWebSocketSubscription: Subscription = new Subscription;


  constructor(private feedService : FeedService, 
    private chatService: ChatService,
    private activeUserService: ActiveUserService) {}

  ngOnInit(): void {
    this.createPostSubscription = this.feedService.createNewPostResponse$.subscribe((response) => {
      if(response)
      this.messages = [...this.messages, response];
    });
    this.getAllPostSubscription= this.feedService.getAllPostResponse$.subscribe((response) => {
      if(response)
      this.messages = [...this.messages, response];
    });
    this.postWebSocketSubscription = this.feedService.getPost().subscribe((response: Post) => {
      if(response)
      this.messages = [...this.messages, response];
    });
    this.chatWebSocketSubscription = this.chatService.getMessage().subscribe((response: Message) => {
      if(response)
      this.messages = [...this.messages, response];
    });
    this.activeUserWebSocketSubscription = this.activeUserService.getActiveUsers().subscribe((response: User[]) => {
      if(response)
      this.messages = [...this.messages, response];
    });
  }

  ngOnDestroy(): void {
    this.createPostSubscription.unsubscribe(); 
    this.getAllPostSubscription.unsubscribe(); 
    this.postWebSocketSubscription.unsubscribe(); 
    this.chatWebSocketSubscription.unsubscribe(); 
    this.activeUserWebSocketSubscription.unsubscribe();
  }



}
