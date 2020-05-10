import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
    selector: 'app-doctor-dialog',
    templateUrl: 'doctor-add-dialog.component.html',
    styleUrls: ['./doctor-add-dialog.component.css'],
})
export class AddDoctorDialogComponent {
    addForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<AddDoctorDialogComponent>,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    
    ngOnInit() {
        this.addForm = this.formBuilder.group({
            name: ['', [Validators.required]],
        })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    get form() { return this.addForm.controls };

    save(): void {
        this.dialogRef.close(this.addForm.value);
    }
}