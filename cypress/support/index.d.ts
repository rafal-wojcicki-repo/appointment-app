declare namespace Cypress {
    interface Chainable<Subject = any> {
      fillAppointmentForm(appt: any): void
    }
}
