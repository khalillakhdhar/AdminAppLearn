import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { getFirebaseBackend } from '../../authUtils';
import { User } from '../models/auth.models';
import { UsersService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    user: User;

    constructor(private userService: UsersService) {}

    /**
     * Returns the current user
     */
    public currentUser(): User {
        return getFirebaseBackend().getAuthenticatedUser(); // get the user from firebase auth service
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(email: string, password: string) {
        return getFirebaseBackend().loginUser(email, password).then((response: any) => {
            const user = response;
            this.readme(email);
            return user;
        });
    }

    /**
     * Performs the register
     * @param email email
     * @param password password
     */
    register(us: any) {
        return getFirebaseBackend().registerUser(us.email, us.password).then((response: any) => {
            let uss = Object.assign({}, us);
            console.log(uss);
            delete uss.password;
            this.userService.create_NewUser(uss);
            this.readme(uss.email);
            const user = response;
            return user;
        }).catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                // Handle the case where the email already exists
                return throwError('This email is already in use.');
            } else {
                // Handle other errors
                return throwError(error.message);
            }
        });
    }

    readme(email: string): void {
        this.userService.read_current(email).pipe(
            map(changes =>
                changes.map(c =>
                    ({ id: c.payload.doc.id, ...c.payload.doc.data() as {} })
                )
            )
        ).subscribe(data => {
            let me = data[0];
            localStorage.setItem('user', JSON.stringify(me));
            console.clear();
            console.log("myuser", me);
        });
    }

    /**
     * Reset password
     * @param email email
     */
    resetPassword(email: string) {
        return getFirebaseBackend().forgetPassword(email).then((response: any) => {
            const message = response.data;
            return message;
        });
    }

    /**
     * Logout the user
     */
    logout() {
        // logout the user
        getFirebaseBackend().logout();
    }
}
