import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private usernameSubject = new BehaviorSubject<string>('');
  
  getUsername(): Observable<string> {
    return this.usernameSubject.asObservable();
  }

  setUsername(username: string): void {
    this.usernameSubject.next(username);
  }
}