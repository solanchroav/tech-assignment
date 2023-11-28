import { Injectable } from "@nestjs/common";
import { Observable, of } from "rxjs";
import { CreatePostDto } from "src/models/dtos/create-post.dto";
import { Post } from "../../../../Shared/models/post.model";
    
@Injectable()
export class PostHelperService {

     createPostDtoToEntity(createPostDto : CreatePostDto): Observable<Post> {
        return of({
            username: createPostDto.username,
            content: createPostDto.content,
            likes: createPostDto.likes,
            comments: createPostDto.comments,
            createdAt: createPostDto.createdAt
        });
    }
}