import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
import { User } from '../../../../Shared/models/user.model';

export interface CommentEntity extends InMemoryDBEntity{
    user: User; 
    postId: string; 
    content: string;
    createdAt: Date;
  }