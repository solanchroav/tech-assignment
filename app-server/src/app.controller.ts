import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiGateway } from './gateways/api.gateway';
import { Post as PostModel } from '../../Shared/models/post.model';
import { Observable, switchMap } from 'rxjs';
import { PostHelperService } from './services/helpers/post-helper.service';
import { CreatePostDto } from './models/dtos/create-post.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly postHelperService: PostHelperService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Post('/post')
  createPost(@Body() createPostDto: CreatePostDto): Observable<PostModel> {
    var postModel : Observable<PostModel> = this.postHelperService.createPostDtoToEntity(createPostDto).pipe(
      switchMap((post : PostModel) => this.appService.createPost(post))
    )
    return postModel;
  }

  @Get('/post')
  getAllPosts() : Observable<PostModel[]> {
    return this.appService.getAllPosts();
  }

  @Get('/post:id')
  getPostById(@Param('id') id: string) : Observable<PostModel|undefined> {
    return this.appService.getPostById(id); 
  }
}
