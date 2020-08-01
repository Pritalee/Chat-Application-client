import { Component, OnInit } from '@angular/core';
import {ChatServiceService} from '../chat-service.service';
import {AuthService} from '../auth.service';



@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  private message: String;
  private to:String;
  private messageArray:any;
  private currentMsg=[];
  private type:String
  private friends=this.Auth.friends;
  private myName=this.Auth.userData;
  private groups=this.Auth.groups;
  //private friends:Array<String>;
  //private myName:String;
  //private groups=[];


  constructor(private chatService:ChatServiceService, private Auth:AuthService) { 
    this.chatService.newMessageReceived().subscribe(data => {
      console.log(data);
      this.currentMsg.push(data)
    });
  }

  ngOnInit() {
    /*
    this.myName =localStorage.getItem('username');
    this.chatService.getLoggedUser(this.myName).subscribe(response=>{
      console.log(response);
      this.friends=response.friends;
      this.groups=response.groups;
  
    })*/
  }

  sendMessage() {
    var currentDate=new Date();
    this.currentMsg.push({sender:this.myName,receiver:this.to,message:this.message,CurrentDate:currentDate});
 
    this.chatService.sendMessage({sender:this.myName,receiver:this.to,message:this.message,type:this.type});   
    this.message = '';
  }

  selectGroup(group){
    this.currentMsg=[];
    this.to=group;
    this.type='group';
    this.chatService.chatDetails({sender:this.myName,receiver:this.to, type:this.type})
    .subscribe(data=>{
      this.messageArray=data.body;
      console.log(data.body);
    })        
  }

  selectFriend(friend){
    this.currentMsg=[];
    this.to=friend;
    this.type='message';
    console.log('selected friend',friend);
    this.chatService.chatDetails({sender:this.myName,receiver:this.to})
    .subscribe(data => {
        this.messageArray = data.body;
      //this.messageArray=content;
      console.log(data.body);
    })
  }

}
