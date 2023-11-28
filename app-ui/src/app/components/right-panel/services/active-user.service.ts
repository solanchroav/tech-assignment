import { Socket } from "ngx-socket-io";
import { Post } from "../../../../../../Shared/models/post.model";
import { User } from "../../../../../../Shared/models/user.model";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ActiveUserService {

    constructor(private socket: Socket){

    }

    getActiveUsers(): Observable<User[]> {
        return this.socket.fromEvent<User[]>('userAdded');
    }
}