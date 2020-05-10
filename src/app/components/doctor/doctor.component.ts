import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { MatDialog } from "@angular/material/dialog";
import { AddDoctorDialogComponent } from './add/doctor-add-dialog.component';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  columnsToDisplay: string[] = ['id', 'name'];
  loading = false;
  doctors = [];

  constructor(
    private apiService: ApiService, 
    private addDoctorDialog: MatDialog) { }

  ngOnInit(): void {
    this.getDoctors();
  }

  openAddDoctorDialog(): void {
    const addDoctorDialogRef = this.addDoctorDialog.open(AddDoctorDialogComponent, {});

    addDoctorDialogRef.afterClosed().toPromise().then((data) => {
      if (data != undefined) {
        this.createDoctor(data);
      }
    })
  }

  createDoctor(data): void {
    this.apiService.createDoctor(data).then((data) => {
      this.getDoctors();
    })
  }

  getDoctors(): void {
    this.loading = true;
    this.apiService.getDoctors().then((data) => {
      this.doctors = data;
      this.loading = false;      
    })
  }
}
