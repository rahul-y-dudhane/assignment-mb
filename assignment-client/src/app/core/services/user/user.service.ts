import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    loggedInUser = new BehaviorSubject<UserModel>(null);

    getLoggedInUser(): Observable<any> {
        return this.loggedInUser;
    }

    setLoggedInUser(user: UserModel) {
        this.loggedInUser.next(user);
    }
}