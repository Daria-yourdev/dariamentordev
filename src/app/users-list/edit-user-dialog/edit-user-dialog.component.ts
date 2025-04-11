import { NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: 'app-edit-user-dialog',
    standalone: true,
    templateUrl: 'edit-user-dialog.component.html',
    styleUrl: 'edit-user-dialog.component.scss',
    imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, NgIf, MatIconModule, MatDialogClose]
})
export class EditUserDialogComponent {

    readonly data = inject(MAT_DIALOG_DATA);
    readonly dialogRef = inject(MatDialogRef<EditUserDialogComponent>)

    public form = new FormGroup({
        name: new FormControl(
            this.data.user.name, { validators: [Validators.required, Validators.minLength(2)] }
        ),
        email: new FormControl(
            this.data.user.email, { validators: [Validators.required, Validators.email] }
        ),
        website: new FormControl(
            this.data.user.website, { validators: [Validators.required, Validators.minLength(2)] }
        ),
        company: new FormGroup({
            name: new FormControl(
                this.data.user.company.name, { validators: [Validators.required, Validators.minLength(2)] })
        })
    });

    get userWithUpdatedFields() {
        return {
            ...this.form.value, id: this.data.user.id,
        };
    }
}