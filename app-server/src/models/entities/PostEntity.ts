import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
import { CommentEntity } from './CommentEntity';

export interface PostEntity extends InMemoryDBEntity {
  username: string;
  content: string;
  likes: number;
  comments: CommentEntity[];
  createdAt: Date; 
}