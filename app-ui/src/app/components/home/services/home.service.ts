import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Post } from "../../../../../../Shared/models/post.model";
import { User } from "../../../../../../Shared/models/user.model";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    private apiUrl = environment.apiUrl;
    constructor(private http: HttpClient, private socket: Socket){

    }

    sendUser(user: User[]){
      this.socket.emit('addUser', user);
    }

    getActiveUsers(): Observable<User[]> {
      return this.socket.fromEvent<User[]>('userAdded');
  }
}