import { User } from "./user.model";

export interface Comment {
    id: string;
    user: User; 
    postId: string; 
    content: string;
    createdAt: Date;
  }