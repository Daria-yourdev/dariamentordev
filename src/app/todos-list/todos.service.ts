import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Todo } from "./todos-list.component"

@Injectable({ providedIn: 'root' })
export class TodosService {
    
    private todoSubject$ = new BehaviorSubject<Todo[]>([]);
    todos$ = this.todoSubject$.asObservable();

    setTodos(todos: Todo[]) {
        this.todoSubject$.next(todos);
    }

    editTodos(edittodo: Todo) {
        this.todoSubject$.next(
            this.todoSubject$.value.map(
                todo => {
                    return todo.id === edittodo.id ? edittodo : todo;
                }
            )
        )
    }

    createTodo(todo: Todo) {
        this.todoSubject$.next([...this.todoSubject$.value, todo])
    }

    deleteTodo(id: number) {
        this.todoSubject$.next(
            this.todoSubject$.value.filter(
                item => {
                    return id !== item.id;
                }
            )
        )
    }
}