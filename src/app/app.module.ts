import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
//component
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ChatsComponent } from './chats/chats.component';
import { AuthGuardService } from './auth-guard.service';
import { AddFriendsComponent } from './add-friends/add-friends.component';
import { CreateGroupComponent } from './create-group/create-group.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ChatsComponent,
    AddFriendsComponent,
    CreateGroupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path:'',
        component:SignupComponent,
        
      },
      {
        path:'signup',
        component:SignupComponent 
      },
      {
        path:'login',
      component:LoginComponent,
      //canActivate:[AuthGuardService]
    },
    {
      path:'chat',
      component:ChatsComponent,
      //canActivate:[AuthGuardService] 
    },
    {
      path:'addFriends',
      component:AddFriendsComponent
    },
    {
      path:'createGroup',
      component:CreateGroupComponent
    }
    ])
  ],
  providers: [AuthService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
