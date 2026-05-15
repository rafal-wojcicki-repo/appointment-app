import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
export class AppointmentService {
    // Use environment.apiUrl when provided, otherwise fall back to relative path
    private base = (environment.apiUrl || '').replace(/\/$/, '');
    apiUrl = this.base ? `${this.base}/appointments` : '/appointments';

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
