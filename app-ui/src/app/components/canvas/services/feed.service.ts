import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Post } from "../../../../../../Shared/models/post.model";
import { User } from "../../../../../../Shared/models/user.model";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class FeedService {

    private apiUrl = environment.apiUrl;
    private createNewPostResponseSubject = new BehaviorSubject<any>(null);
    createNewPostResponse$ = this.createNewPostResponseSubject.asObservable();
    private getAllPostResponseSubject = new BehaviorSubject<any>(null);
    getAllPostResponse$ = this.getAllPostResponseSubject.asObservable();


    constructor(private socket: Socket, private http: HttpClient){

    }

    sendPost(post: Post){
        this.socket.emit('addPost', post);
    }

    getPost(): Observable<Post> {
        return this.socket.fromEvent<Post>('postAddedOrUpdated');
    }

    async getAllPosts(): Promise<Post[]> {
        try {
            const posts: Post[] = await this.http.get<Post[]>(`${this.apiUrl}/post`).toPromise();
            this.getAllPostResponseSubject.next(posts);
            return posts;
        } catch (error) {
            throw new Error('Error fetching posts: ' + error);
        }
    }

    async createNewPost(postData: Post): Promise<Post> {
        try {
          const newPost: Post = await this.http.post<Post>(`${this.apiUrl}/post`, postData).toPromise();
          this.createNewPostResponseSubject.next(newPost);
          return newPost;
        } catch (error) {
          throw new Error('Error creating new post: ' + error);
        }
    }
}