Feature: Create appointment
  In order to keep track of meetings
  As a user
  I want to create a new appointment via the UI

  Scenario: User creates a valid appointment
    Given I open the app
    And I fill the appointment form with valid data
    When I submit the appointment form
    Then I should see the appointment in the list

