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
   //Array<{sender: String,receiver: String, message: String}> ;
  //groups:Array<String>=['Best friends','Family time','DJites','School buddies'];
  private friends=this.Auth.friends
  private myName=this.Auth.userData;
  private groups=this.Auth.groups;


  constructor(private chatService:ChatServiceService, private Auth:AuthService) { 
    this.chatService.newMessageReceived().subscribe(data => {
      console.log(data);
      this.currentMsg.push(data)
    });
    /*
    this.chatService.newGroupMsgReceived().subscribe(data => {
      console.log(data);
      this.currentMsg.push(data)
    }); */
  }


  ngOnInit() {
    //<span class="badge badge-primary badge-pill">14</span>
    //d-flex justify-content-between align-items-center
    //<input [(ngModel)]="to" name="to" type="text" placeholder="to" /> 
    // <p>This is {{myName}}</p>
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
