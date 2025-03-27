import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-create-user-form',
    standalone: true,
    templateUrl: 'create-user-form.component.html',
    styleUrl: 'create-user-form.component.scss',
    imports: [ReactiveFormsModule]
})
export class CreateUserFormComponent {

    @Output()
    createUser = new EventEmitter();

    public form = new FormGroup({
        name: new FormControl(
            '',
            {
                validators:
                    [Validators.required, Validators.minLength(2)]
            }
        ),
        email: new FormControl(
            '',
            {
                validators:
                    [Validators.required, Validators.email]
            }
        ),
        website: new FormControl(
            '',
            {
                validators:
                    [Validators.required, Validators.minLength(2)]
            }
        ),
        company: new FormGroup({
            name: new FormControl(
                '',
                {
                    validators:
                        [Validators.required, Validators.minLength(2)]
                })
        })
    });


    public submitForm(): void {
        this.createUser.emit(this.form.value);
    }
}