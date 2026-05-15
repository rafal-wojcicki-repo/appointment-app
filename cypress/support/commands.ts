// custom commands for Cypress
Cypress.Commands.add('fillAppointmentForm', (appt) => {
  cy.get('[data-cy=input-title]').type(appt.title);
  cy.get('[data-cy=input-date]').type(appt.date);
  if (appt.time) cy.get('[data-cy=input-time]').type(appt.time);
  if (appt.notes) cy.get('[data-cy=input-notes]').type(appt.notes);
  if (appt.important) cy.get('[data-cy=input-important]').check();
});

