import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsDate
  } from 'class-validator';
  import { Comment } from '../../../../Shared/models/comment.model';

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    username: string; 

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsNumber()
    likes: number;

    comments: Comment[];

    // @IsNotEmpty()
    // @IsDate()
    createdAt: Date;
}