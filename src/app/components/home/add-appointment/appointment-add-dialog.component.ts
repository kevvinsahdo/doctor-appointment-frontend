import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import ApiService from 'src/app/services/api/api.service';


@Component({
    selector: 'app-appointment-dialog',
    templateUrl: 'appointment-add-dialog.component.html',
    styleUrls: ['./appointment-add-dialog.component.css'],
})
export class AddAppointmentDialogComponent {
    addForm: FormGroup;
    loading = false;
    doctors = [];

    constructor(
        public dialogRef: MatDialogRef<AddAppointmentDialogComponent>,
        private formBuilder: FormBuilder,
        private apiService: ApiService,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    get form() { return this.addForm.controls };

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            doctorId: ['', [Validators.required]],
            date: ['', [Validators.required]],
            doctors: [[]],
        })

        this.getDoctors();
    }

    getDoctors(): any {
        this.loading = true;
        this.apiService.getDoctors().then((data) => {
            this.loading = false;
            this.addForm.controls['doctors'].setValue(data);
        })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }


    save(): void {
        let appointment = {
            doctorId: this.addForm.value['doctorId'],
            date: this.addForm.value['date'].toISOString()
        }

        this.dialogRef.close(appointment);
    }
}