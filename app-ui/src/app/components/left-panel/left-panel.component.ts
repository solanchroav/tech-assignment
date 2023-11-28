import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from './services/chat.service';
import { Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { Message } from '../../../../../Shared/models/message.model';
import { StateService } from 'src/app/services/state.service';


@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit, OnDestroy {

  @Input() chatroom: any;
  messages: Message[] = [];
  username: string = '';

  messageSubscription: Subscription = new Subscription;
  usernameSubscription: Subscription = new Subscription;

  chatMessage: FormControl = new FormControl(null, [Validators.required]);

  constructor(private chatService: ChatService, private stateService: StateService) { }

  ngOnInit(): void {
    this.messageSubscription = this.chatService.getMessage().subscribe((newMessage: Message) => {
      this.messages.push(newMessage);
    });
    this.usernameSubscription = this.stateService.getUsername().subscribe(username => {
      this.username = username;
    });
  }

  ngOnDestroy(): void {
    this.usernameSubscription.unsubscribe();
    this.messageSubscription.unsubscribe();
  }


  sendMessage() {
    this.chatService.sendMessage({ username: this.username, text: this.chatMessage.value });
    this.chatMessage.reset();
  }
}
