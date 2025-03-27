import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";

@Component({
    selector: 'app-create-todo-form',
    standalone: true,
    templateUrl: 'create-todo-form.component.html',
    styleUrl: 'create-todo-form.component.scss',
    imports: [ReactiveFormsModule]
})
export class CreateTodoFormComponent {

    @Output()
    createTodo = new EventEmitter();

    public form = new FormGroup({
        userId: new FormControl(
            '',
            {
                validators: [Validators.required, Validators.minLength(2)]
            }
        ),
        title: new FormControl(
            '',
            {
                validators: [Validators.required, Validators.minLength(5)]
            }
        ),
        completed: new FormControl(false)
    })

    public submitForm(): void {
        this.createTodo.emit(this.form.value)
    }
}