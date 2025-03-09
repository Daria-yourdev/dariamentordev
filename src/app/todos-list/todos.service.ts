import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Todo } from "./todos-list.component"

@Injectable({ providedIn: 'root' })
export class TodosService {
    
    todosSubject = new BehaviorSubject<Todo[]>([]);

    setTodos(todos: Todo[]) {
        this.todosSubject.next(todos);
    }

    editTodos(edittodo: Todo) {
        this.todosSubject.next(
            this.todosSubject.value.map(
                todo => {
                    if (todo.id === edittodo.id) {
                        return edittodo
                    } else {
                        return todo
                    }
                }
            )
        )
    }

    createTodo(todo: Todo) {
        this.todosSubject.next([...this.todosSubject.value, todo])
    }

    deleteTodo(id: number) {
        this.todosSubject.next(
            this.todosSubject.value.filter(
                item => {
                    if (id === item.id) {
                        return false
                    } else {
                        return true
                    }
                }
            )
        )
    }
}