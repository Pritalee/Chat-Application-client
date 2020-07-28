import { Component, OnInit } from '@angular/core';
import {ChatServiceService} from '../chat-service.service';
import {AuthService} from '../auth.service';
import { FormControl } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.css']
})
export class AddFriendsComponent implements OnInit {

  private searchedUsers;
  queryField: FormControl = new FormControl();
  private myName;
  private successMsg;

  
  constructor( private chatService:ChatServiceService, private Auth:AuthService,private route: ActivatedRoute
    //, private Cookie:CookieService
  ) { }

  ngOnInit() {
    this.myName=this.Auth.userData
    this.queryField.valueChanges
    .subscribe( queryField => this.chatService.searchFriends(queryField)
        .subscribe(response=>{
          console.log(response);
          this.searchedUsers=response;
        }) 
      );
  }
  AddFriends(friend){
    console.log(friend);
    console.log(this.Auth.userData);
    const data={
      myName:this.myName,
      friend:friend
    }
    this.chatService.addFriends(data)
    .subscribe(response=>this.successMsg=response)

  }
}
