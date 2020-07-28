import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service'

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  private friends;

  constructor(private Auth:AuthService) { }

  ngOnInit() {
    console.log(this.Auth.friends);
    this.friends=this.Auth.friends;

  }

}
