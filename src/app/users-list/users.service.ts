import { Injectable } from "@angular/core";
import { User } from "./users-list.component"
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UsersService {

    private userSubject$ = new BehaviorSubject<User[]>([]);
    users$ = this.userSubject$.asObservable();

    setUsers(users: User[]) {
        this.userSubject$.next(users);
    }

    editUsers(editeduser: User) {
        this.userSubject$.next(
            this.userSubject$.value.map(
                user => {
                    return user.id === editeduser.id ? editeduser : user;
                }
            )
        )
    }

    createUser(user: User) {
        this.userSubject$.next([...this.userSubject$.value, user])
    }

    deleteUser(id: number) {
        this.userSubject$.next(
            this.userSubject$.value.filter(
                item => {
                    return id !== item.id;
                }
            )
        )
    }
}