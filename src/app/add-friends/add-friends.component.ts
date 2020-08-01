import { Component, OnInit } from '@angular/core';
import {ChatServiceService} from '../chat-service.service';
import {AuthService} from '../auth.service';
import { FormControl } from '@angular/forms';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';

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
  private friends=[];

  
  constructor( private chatService:ChatServiceService, private Auth:AuthService,private route: ActivatedRoute
    //, private Cookie:CookieService
  ) { }

  ngOnInit() {
    if(this.Auth.userData){
      this.myName=this.Auth.userData;
      this.chatService.getLoggedUser(this.myName).subscribe(response=>{
      this.friends=response.friends;
      console.log(this.friends);
    });

    }
    

    this.queryField.valueChanges//.pipe(debounceTime(300),distinctUntilChanged())
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
