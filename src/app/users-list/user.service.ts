import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

export interface User {
    name: string;
    isAdmin: boolean;
}

@Injectable({ providedIn: 'root' })
export class UserService {

    private readonly userSubject$ = new BehaviorSubject<User | null>(null);
    public readonly user$ = this.userSubject$.asObservable();

    constructor(private router: Router) { }

    public loginAsUser() {
        this.userSubject$.next({ name: 'User', isAdmin: false });
    }

    public loginAsAdmin() {
        this.userSubject$.next({ name: 'Admin', isAdmin: true });
    }

    get isAdmin(): boolean {
        return this.userSubject$.value?.isAdmin ?? false;
    }

    public logout() {
        this.userSubject$.next(null);
        this.router.navigate(['/']);
    }
}