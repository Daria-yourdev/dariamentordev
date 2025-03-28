import { NgIf } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: 'app-create-todo-form',
    standalone: true,
    templateUrl: 'create-todo-form.component.html',
    styleUrl: 'create-todo-form.component.scss',
    imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, NgIf, MatRadioModule, MatIconModule]
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