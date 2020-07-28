import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { FormGroup, FormControl,Validators } from '@angular/forms'
import { stringify } from 'querystring';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public error:string;
  registerForm: FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    contact:new FormControl(null,[Validators.required]),
    username:new FormControl(null,[Validators.required]),
    password:new FormControl(null,[Validators.required]),
    cpassword:new FormControl(null,[Validators.required])
  })

  constructor(private Auth: AuthService, private router:Router ) { }

  ngOnInit() {
  }
  register(){
    if(!this.registerForm.valid ||( this.registerForm.controls.password.value != this.registerForm.controls.cpassword.value)){
      this.error='Invalid form';console.log('Invalid form'); return;
    }
    this.Auth.sendUserDetails(JSON.stringify(this.registerForm.value)).subscribe(data=>{
      console.log(data,"this response from server for register");
      this.router.navigateByUrl('/login')
    },
    err=>{
      this.error=err.error.errorMessage;
      console.log('register server error',err);
    })
    //console.log(JSON.stringify(this.registerForm.value));
  }


  signupUser(event){
    event.preventDefault();
    const target=event.target;
    const email=target.querySelector('#email').value;
    const contact=target.querySelector('#contact').value;
    const username=target.querySelector('#username').value;
    const password=target.querySelector('#password').value;
    //this.Auth.sendUserDetails(email,contact,username,password);
    //console.log(email,username,contact,password);
  }
}
