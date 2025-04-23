import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface User {
    name: string;
    isAdmin: boolean;
}

@Injectable({ providedIn: 'root' })
export class UserService {

    private user: User | null = null;

    private readonly userSubject$ = new BehaviorSubject<User | null>(this.user);
    public readonly user$ = this.userSubject$.asObservable();

    public loginAsUser() {
        this.user = { name: 'User', isAdmin: false };
        this.userSubject$.next(this.user);
    }

    public loginAsAdmin() {
        this.user = { name: 'Admin', isAdmin: true };
        this.userSubject$.next(this.user);
    }

    get isAdmin(): boolean {
        return this.user?.isAdmin ?? false;
    }

    public logout() {
        this.user = null;
        this.userSubject$.next(null);
    }
}