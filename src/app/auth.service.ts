import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn:boolean;
  public userData; 
  public friends;
  public groups;

  constructor(private http:HttpClient, private router:Router) { }

  getUserDetails(details){
    if(!this.isLoggedIn){
      return this.http.post('http://localhost:5000/api/login',details,
    {
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
    this.router.navigateByUrl('/chat')
  }
    
  sendUserDetails(details){
    console.log(details);
    return this.http.post('http://localhost:5000/api/signup',details,
  {
    observe:'body',
    withCredentials:true,
    headers:new HttpHeaders().append('Content-Type','application/json')
  })

  }

  saveToken(data){
    this.userData=data.user.userName;
    this.friends=data.user.friends;
    this.groups=data.user.groups;
    //this.cookieService.set('username',data.user.userName,1,'/','',true,'Strict');
 

    //console.log(this.userData);
    //localStorage.setItem('jwtToken',data.token);
    //localStorage.setItem('email',data.user.email);
    //localStorage.setItem('username',data.user.userName);
    //window.localStorage['jwtToken']=data.token;
    this.isLoggedIn=true
  }

  destroyToken(){
    window.localStorage.removeItem('jwtToken');
  }

}
