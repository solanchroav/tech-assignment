import { Component, OnInit, OnDestroy} from '@angular/core';
import {Post } from '../../../../../Shared/models/post.model'
import { FeedService } from './services/feed.service';
import { Subscription } from 'rxjs';
import { StateService } from 'src/app/services/state.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, OnDestroy {

  username: string = ''; 
  posts: Post[] = [];
  allPosts: Post[] = [];
 
  postSubscription: Subscription = new Subscription;
  usernameSubscription: Subscription = new Subscription;

  postMessage: FormControl = new FormControl(null, [Validators.required]);

  
  constructor(private feedService: FeedService, private stateService: StateService) { }


  ngOnInit(): void {
  this.postSubscription = this.feedService.getPost().subscribe((newPost: Post) => {
    if (newPost.username === this.username)
      this.posts = [...this.posts, newPost];
  });
  this.usernameSubscription = this.stateService.getUsername().subscribe(username => {
    this.username = username;
  });
  }

  ngOnDestroy(): void {
    this.usernameSubscription.unsubscribe();
    this.postSubscription.unsubscribe(); 
  }

  async onSubmitNewPost(): Promise<void> {
    try {

      const newPost: Post = {
        username: this.username,
        content: this.postMessage.value,
        likes: 0,
        comments: [],
        createdAt: new Date()
      };

      await this.feedService.createNewPost(newPost);
      await this.feedService.sendPost(newPost);
      await this.postMessage.reset();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async getAllPosts(): Promise<void> {
    try {
      this.allPosts = await this.feedService.getAllPosts();
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
