import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { FormGroup, FormControl,Validators } from '@angular/forms'
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public error: string;
  loginForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,[Validators.required])
  })

  constructor(private Auth: AuthService, private router:Router ) { }

  ngOnInit() {
    if(this.Auth.isLoggedIn){
      this.router.navigateByUrl('/chat')
    }
  }

  login(){
    if( !this.loginForm.valid ){
      console.log('Invalid form');return;
    }
    this.Auth.getUserDetails(JSON.stringify(this.loginForm.value)).subscribe(data=>{
      
      this.Auth.saveToken(data);
      this.router.navigateByUrl('/chat')
    },
    err=>{
      this.error=err.error.errorMessage
      console.log('login server error',err.error.errorMessage);
    })
  }

  
  


}
