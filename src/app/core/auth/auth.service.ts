import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    phoneNumber?: string;
    pseudo?: string;
}

@Injectable()

export class AuthService {
    user: Observable<User>;
    redirectUrl: string;
    uid = '';

    constructor(
        private router: Router
    ) {
        
    }

    oAuthLogin(name: string, callback: any) {
        
    }

    getProvider(name: string) {
        
    }

    signOut() {
    }

    readUser() {
    }


    deleteUser(callback: any) {
        
    }

    private updateUserData(user) {
        
    }
}
