import { Injectable } from "@angular/core";
import { User } from "./users-list.component"
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UsersService {

    private readonly userSubject$ = new BehaviorSubject<User[]>([]);
    public readonly users$ = this.userSubject$.asObservable();

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
        const userExistence = this.userSubject$.value.find(
            (currentemail) => currentemail.email === user.email
        )

        if (userExistence !== undefined) {
            alert('Юзер уже есть. Используйте другой эмаил!')
        } else {
            this.userSubject$.next([user, ...this.userSubject$.value])
            alert('новый пользователь добавлен!')
        }
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