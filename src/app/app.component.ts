import { Component, OnInit } from '@angular/core';

interface Appointment {
  id: number;
  title: string;
  date: string; // ISO date
  time?: string;
  notes?: string;
  important?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'appointment-app';

  appointments: Appointment[] = [];
  currentMonth: Date = new Date();
  calendarWeeks: { date: Date; iso: string; isMonth: boolean }[][] = [];
  expandedDays = new Set<string>();

  // Bound to the form inputs
  model: Partial<Appointment> = {
    title: '',
    date: '',
    time: '',
    notes: '',
    important: false
  };

  ngOnInit(): void {
    this.buildCalendar();
  }

  addAppointment(form?: any) {
    if (!this.model.title || !this.model.date) {
      this.buildCalendar();
      return;
    }

    const appt: Appointment = {
      id: Date.now(),
      title: this.model.title as string,
      date: this.model.date as string,
      time: this.model.time,
      notes: this.model.notes,
      important: !!this.model.important
    };

    // Newest first
    if (appt.important) {
      this.appointments = [appt, ...(this.appointments ?? [])];
    } else {
      const important = (this.appointments ?? []).filter(a => a.important);
      const nonImportant = (this.appointments ?? []).filter(a => !a.important);
      this.appointments = [...important, appt, ...nonImportant];
    }

    // Clear model and form
    this.model = { title: '', date: '', time: '', notes: '', important: false };
    if (form && form.resetForm) {
      form.resetForm();
    }
  }

  deleteAppointment(id: number) {
    this.appointments = this.appointments.filter(a => a.id !== id);
  }

  trackById(index: number, item: Appointment) {
    return item.id;
  }


  private isoDateOnly(d: Date | string): string {
    const date = typeof d === 'string' ? new Date(d) : d;
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private buildCalendar() {
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
        weekDays.push({ date: new Date(cursor), iso: this.isoDateOnly(cursor), isMonth });
        cursor.setDate(cursor.getDate() + 1);
      }
      weeks.push(weekDays);
    }
    
    this.calendarWeeks = weeks;

  }

  prevMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.buildCalendar();
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.buildCalendar();
  }

  toggleDay(iso: string) {
    if (this.expandedDays.has(iso)) this.expandedDays.delete(iso);
    else this.expandedDays.add(iso);
  }

  getAppointmentsForDate(iso: string) {
    return this.appointments.filter(a => this.isoDateOnly(a.date) === iso);
  }

  hasImportantForDate(iso: string): boolean {
    return this.appointments.some(a => this.isoDateOnly(a.date) === iso && !!a.important);
  }


}
