import { NgFor } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule, FormGroup } from "@angular/forms";

@Component ({
    selector: 'app-create-user-form',
    standalone: true,
    templateUrl: 'create-user-form.component.html',
    styleUrl: 'create-user-form.component.scss',
    imports: [NgFor, ReactiveFormsModule]
})
export class CreateUserFormComponent {

    @Output()
    createUser = new EventEmitter();

    public form = new FormGroup({
        name: new FormControl(),
        email: new FormControl(),
        website: new FormControl(),
        company: new FormControl(),
    })

    public submitForm(): void {
        this.createUser.emit(this.form.value);
    }

}