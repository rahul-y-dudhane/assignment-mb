import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    loggedInUser = new BehaviorSubject<UserModel>({
        address: "At-Post- Khingar,↵Tal- Mahabaleshwar,↵Dist- Satara.↵Via- Panchgani",
        company: null,
        dateOfBirth: "2019-10-01",
        email: "rahul412@gmail.com",
        firstName: "Rahul",
        id: 16,
        lastName: "Dudhane",
        mobileNo: "7777777777",
        type: "manager"
    });

    getLoggedInUser(): Observable<any> {
        return this.loggedInUser;
    }

    setLoggedInUser(user: UserModel) {
        this.loggedInUser.next(user);
    }
}