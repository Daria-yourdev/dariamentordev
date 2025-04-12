import { NgIf } from "@angular/common";
import { Component, EventEmitter, inject, Output } from "@angular/core";
import {
    FormControl,
    ReactiveFormsModule,
    FormGroup,
    Validators,
} from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from "@angular/material/icon";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'app-create-user-form',
    standalone: true,
    templateUrl: 'create-user-form.component.html',
    styleUrl: 'create-user-form.component.scss',
    imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, NgIf, MatIconModule]
})
export class CreateUserFormComponent {

    readonly dialogref = inject(MatDialogRef<CreateUserFormComponent>);

    @Output()
    createUser = new EventEmitter();

    public form = new FormGroup({
        name: new FormControl(
            '', { validators: [Validators.required, Validators.minLength(2)] }
        ),
        email: new FormControl(
            '', { validators: [Validators.required, Validators.email] }
        ),
        website: new FormControl(
            '', { validators: [Validators.required, Validators.minLength(2)] }
        ),
        company: new FormGroup({
            name: new FormControl(
                '', { validators: [Validators.required, Validators.minLength(2)] })
        }),
        phone: new FormControl(
            '', { validators: [Validators.required] }
        ),
    });

    public submitForm(): void {
        this.dialogref.close(this.form.value);
    }
}