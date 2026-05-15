import {Component, OnInit} from '@angular/core';
import {AppointmentService, Appointment} from './appointment.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  appointments: Appointment[] = [];
  currentMonth: Date = new Date();
  calendarWeeks: { date: Date; iso: string; isMonth: boolean }[][] = [];
  expandedDays = new Set<string>();
  showPopup = false;

  // Bound to the form inputs
  model: Partial<Appointment> = {
    title: '',
    date: '',
    time: '',
    notes: '',
    important: false
  };

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.buildCalendar();
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAppointments().subscribe((data: Appointment[]) => {
      this.appointments = data;
    });
  }

  addAppointment(form?: { resetForm?: () => void }): void {
    if (!this.model.title || !this.model.date) {
      this.buildCalendar();
      return;
    }
    const appt: Appointment = {
      title: this.model.title as string,
      date: this.model.date as string,
      time: this.model.time || '',
      notes: this.model.notes,
      important: !!this.model.important
    };
    this.appointmentService.addAppointment(appt).subscribe(() => {
      this.loadAppointments();
      this.model = {title: '', date: '', time: '', notes: '', important: false};
      if (form && form.resetForm) {
        form.resetForm();
      }
    });
  }

  deleteAppointment(id: number): void {
    this.appointmentService.deleteAppointment(id).subscribe(() => {
      this.loadAppointments();
    });
  }

  trackById(index: number, item: Appointment): number | undefined {
    return item.id;
  }

  private isoDateOnly(d: Date | string): string {
    const date = typeof d === 'string' ? new Date(d) : d;
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private buildCalendar(): void {
    const firstDayOfMonth = new Date(this.currentMonth.getFullYear(),
      this.currentMonth.getMonth(), 1);
    const startDay = new Date(firstDayOfMonth);
    startDay.setDate(startDay.getDate() - startDay.getDay());

    const weeks: { date: Date; iso: string; isMonth: boolean }[][] = [];
    let cursor = new Date(startDay);

    for (let week = 0; week < 6; week++) {
      const weekDays: { date: Date; iso: string; isMonth: boolean }[] = [];
      for (let day = 0; day < 7; day++) {
        const isMonth = cursor.getMonth() === this.currentMonth.getMonth();
        weekDays.push({date: new Date(cursor), iso: this.isoDateOnly(cursor), isMonth});
        cursor.setDate(cursor.getDate() + 1);
      }
      weeks.push(weekDays);
    }

    this.calendarWeeks = weeks;

  }

  prevMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.buildCalendar();
  }

  nextMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.buildCalendar();
  }

  toggleDay(iso: string): void {
    if (this.expandedDays.has(iso)) {
      this.expandedDays.delete(iso);
      return;
    }
    this.expandedDays.add(iso);
  }

  getAppointmentsForDate(iso: string): Appointment[] {
    return this.appointments.filter(a => this.isoDateOnly(a.date) === iso);
  }

  hasImportantForDate(iso: string): boolean {
    return this.appointments.some(a => this.isoDateOnly(a.date) === iso && !!a.important);
  }

  openPopup(): void {
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }
}
