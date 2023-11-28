import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { OnModuleInit } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PostEntity } from 'src/models/entities/PostEntity';
import { Like } from '../../../Shared/models/like.model';
import { Message } from '../../../Shared/models/message.model';
import { Post } from '../../../Shared/models/post.model';
import { Comment } from '../../../Shared/models/comment.model';
import { firstValueFrom } from 'rxjs';
import { User } from '../../../Shared/models/user.model';

//@WebSocketGateway({ namespace: 'app-ui' })
@WebSocketGateway({cors:{origin: ['http://localhost:3000','http://localhost:4200']}})
export class ApiGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
  constructor(private postService: InMemoryDBService<PostEntity>) {}
  
  @WebSocketServer() server: Server;

  
  onModuleInit(){
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    } )
  }

  @SubscribeMessage('addUser')
  async onAddUser(socket: Socket, message: User[]) {
      await this.server.emit('userAdded', message);
  } 

  @SubscribeMessage('addMessage')
  async onAddMessage(socket: Socket, message: Message) {
      await this.server.emit('messageAdded', message);
  }

  @SubscribeMessage('addPost')
  async onAddPost(socket: Socket, message: Post) {
      await this.server.emit('postAddedOrUpdated', message);
  }

  @SubscribeMessage('addLike')
  async handleLikePost(client: Socket, data: Like) {
    try {
      const postToUpdate = await this.postService.getAsync(data.postId);
      const firstValue = await firstValueFrom(postToUpdate);
      if (firstValue) {
        firstValue.likes++;
        this.postService.updateAsync(firstValue); 
      }
      this.server.emit('postAddedOrUpdated', firstValue);
    } catch (error) {
      console.error("Could not update the likes: ", error);
    }
  }

  @SubscribeMessage('addComment')
  async handleCommentPost(client: Socket, data: Comment) {
    try {
      const postToUpdate = await this.postService.getAsync(data.postId);
      const firstValue = await firstValueFrom(postToUpdate);
      if (firstValue) {
        firstValue.comments.push(data);
        this.postService.updateAsync(firstValue); 
      }
      await this.server.emit('postAddedOrUpdated', firstValue);
    } catch (error) {
      console.error("Could not update the comment: ", error);
    }
  }

  handleConnection(socket: Socket) {
    // Handle client connections
    console.log(`Client connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    // Handle client disconnections
    console.log(`Client disconnected: ${socket.id}`);
  }
}