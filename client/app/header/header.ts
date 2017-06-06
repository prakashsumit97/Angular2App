import { Component } from '@angular/core';
import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    selector: 'app-header',
    templateUrl:`./app/header/header.html`,
})
export class HeaderComponent {
    currentUser: User;
    users: User[] = [];
    username:string;
    
     constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username=this.currentUser.username;
    }
}