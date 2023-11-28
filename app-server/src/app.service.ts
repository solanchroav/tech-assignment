import { Injectable } from '@nestjs/common';
import { InMemoryDBService, InjectInMemoryDBService, InMemoryDBEntityAsyncController } from '@nestjs-addons/in-memory-db';
import { PostEntity } from './models/entities/PostEntity';
import { Post } from '../../Shared/models/post.model';
import { Observable, from, switchMap } from 'rxjs';

@Injectable()
export class AppService {

  constructor(
    private readonly postService: InMemoryDBService<PostEntity>
    ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createPost(newPost: Post) {
    return from(this.postService.createAsync(newPost).pipe(
      switchMap((post : PostEntity) => this.findOnePost(post.id)))
    );
    
  }

  private findOnePost(id: string): Observable<PostEntity> {
    return from(this.postService.getAsync(id));
  }


  getAllPosts(): Observable<Post[]> {
    return this.postService.getAllAsync(); 
  }

  getPostById(id: string):  Observable<Post|undefined> {
    return this.postService.getAsync(id); 
  }
}
