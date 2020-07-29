import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import {ChatServiceService} from '../chat-service.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  private friends;
  private selected=[this.Auth.userData];
  groupForm:FormGroup=new FormGroup({
    selectedFriends:new FormControl,
    groupName:new FormControl(null,[Validators.required])
  });

  constructor(private Auth:AuthService, private chatService:ChatServiceService) { }

  ngOnInit() {
    console.log(this.Auth.friends);
    this.friends=this.Auth.friends;
  }

  checkedFriends(friend){
    this.selected.push(friend);
  }

  createGroup(){
    const data={
      groupMembers:this.selected,
      groupName:this.groupForm.value.groupName
    }
    console.log(this.selected);
    this.chatService.newGroup(data).subscribe(response=>{
      console.log(response);
    })
  }

}
