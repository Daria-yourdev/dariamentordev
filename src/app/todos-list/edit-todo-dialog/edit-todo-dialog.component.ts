import { Component, Inject, inject } from "@angular/core";
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogModule,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgIf } from "@angular/common";


@Component({
    selector: 'app-edit-todo-dialog',
    templateUrl: './edit-todo-dialog.component.html',
    styleUrl: './edit-todo-dialog.component.scss',
    standalone: true,
    imports: [MatFormField, MatError, MatLabel, MatRadioButton, MatRadioGroup, MatDialogClose, MatIcon, ReactiveFormsModule, MatDialogModule, MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule, NgIf
    ],
})
export class EditTodoDialogComponent {

    readonly data = inject(MAT_DIALOG_DATA);
    readonly dialogRef = inject(MatDialogRef<EditTodoDialogComponent>)

    public form = new FormGroup({
        userId: new FormControl(
            this.data.todo.userId, { validators: [Validators.required, Validators.minLength(2)] }
        ),
        title: new FormControl(
            this.data.todo.title, { validators: [Validators.required, Validators.minLength(5)] }
        ),
        completed: new FormControl(this.data.todo.completed)
    });

    get todoWithUpdatedFields() {
        return {
            ...this.form.value, id: this.data.todo.id,
        }
    }
}