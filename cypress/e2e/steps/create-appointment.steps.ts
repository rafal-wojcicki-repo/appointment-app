import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I open the app', () => {
  cy.visit('/');
});

Given('I fill the appointment form with valid data', () => {
  cy.fixture('appointments').then((data) => {
    const appt = data[0];
    cy.fillAppointmentForm(appt);
  });
});

When('I submit the appointment form', () => {
  cy.get('[data-cy=submit-appointment]').click();
});

Then('I should see the appointment in the list', () => {
  cy.fixture('appointments').then((data) => {
    const appt = data[0];
    cy.get('[data-cy=appointments-list]').should('contain', appt.title);
  });
});

