import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Appointment {
  id?: number;
  title: string;
  date: string;
  time: string;
  notes?: string;
  important?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AppoitmentService {
    apiUrl = `${environment.apiUrl}/appointments`;

    constructor(private http: HttpClient) { }

    getAppointments() {
        return this.http.get<any[]>(this.apiUrl);
    }

    addAppointment(appt: any) {
        return this.http.post(this.apiUrl, appt);
    }

    deleteAppointment(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}