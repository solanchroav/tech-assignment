import { Comment } from './comment.model';
export interface Post {
    id?: string;
    username: string; 
    content: string;
    likes: number;
    comments: Comment[];
    createdAt: Date;
  }