import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import ApiService from 'src/app/services/api/api.service';
import { AddAppointmentDialogComponent } from './add-appointment/appointment-add-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  columnsToDisplay: string[] = ['id', 'date', 'doctor', 'user'];
  loading = false;
  appointments = [];

  constructor(
    private apiService: ApiService,
    private addAppointmentDialog: MatDialog) { }

  ngOnInit(): void {
    this.getAppointments();
  } 1
 
  createAppointment(data): void {
    this.apiService.createAppointment(data).then((data) => {
      this.getAppointments();
    })
  }

  openAddAppointmentDialog(): void {
    const addAppointmentDialogRef = this.addAppointmentDialog.open(AddAppointmentDialogComponent, {})

    addAppointmentDialogRef.afterClosed().toPromise().then((data) => {
      if (data != undefined) {
        this.createAppointment(data);
      }
    })
  }

  getAppointments(): void {
    this.loading = true;
    this.apiService.getAppointments().then((data) => {
      this.appointments = data;
      this.loading = false;
    })
  }
}
