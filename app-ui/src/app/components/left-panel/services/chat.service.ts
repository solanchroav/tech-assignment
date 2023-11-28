import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Observable } from "rxjs";
import { Message } from '../../../../../../Shared/models/message.model';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    constructor(private socket: Socket){

    }

    getMessage(): Observable<Message> {
        return this.socket.fromEvent<Message>('messageAdded');
    }

    sendMessage(message: Message) {
        this.socket.emit('addMessage', message, (ack: any) => {
            if (ack && ack.error) {
                console.error('Error occurred:', ack.error);
            } else {
                console.log('Message sent successfully:', ack);
            }
        });
    }
    
}