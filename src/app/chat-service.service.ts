import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  private socket = io.connect('http://localhost:5000',{query:`username=${this.Auth.userData}`});
  constructor(private Auth:AuthService,private http:HttpClient) { }

  sendMessage(data) {
    this.socket.emit('message', data);
  }

  newMessageReceived() {
    const observable = new Observable<{ sender: String,receiver: String, message: String}>(observer => {
      this.socket.on('new message', (data) => {
        console.log('new mesage chat service',data)
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  chatDetails(data){

    console.log(data);
    return this.http.post('http://localhost:5000/api/chats',data,
    {
      observe:'response',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
      }) 
  }

  searchFriends(search){
    const data={
      queryField:search
    }
    //console.log(data);
    return this.http.post('http://localhost:5000/api/searchFriends',data,
      {
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
      });      
  }

  addFriends(data){
    return this.http.post('http://localhost:5000/api/addFriends',data,
      {
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
      });  

  }

  
}

