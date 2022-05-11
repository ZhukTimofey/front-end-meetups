export function login({ login, password }) {
  cy.get("[data-cy=unauthorized-login]").click();
  cy.get("[data-cy=login]").type(login);
  cy.get("[data-cy=password]").type(password);
  cy.get("[data-cy=login-submit]").click();
}
export function createMeetup({
  subject,
  speaker,
  excerpt,
  time,
  timeStart,
  timeFinish,
  place,
}) {
  cy.get("[data-cy=creation-subject]").type(subject);
  cy.contains("Выбор").click({ force: true });
  cy.contains(speaker).click({ force: true });
  cy.get("[data-cy=creation-excerpt]").type(excerpt);
  cy.get("[data-cy=creation-to-additional]").click();
  cy.get("[data-cy=date-picker-start]").click();
  cy.contains(time).click();
  cy.contains(timeStart).click();
  cy.get("[data-cy=date-picker-finish]").click();
  cy.contains(time).click();
  cy.contains(timeFinish).click();
  cy.get("[data-cy=creation-place]").type(place);
  cy.get("[data-cy=creation-create]").click();
}

export function checkMeetupValues({
  subject,
  time,
  timeStart,
  timeFinish,
  speaker,
  place,
  excerpt,
}) {
  cy.get("[data-cy=meetup-subject]").should("have.text", subject);
  cy.get("[data-cy=meetup-time]").should("contain.text", time);
  cy.get("[data-cy=meetup-time-start]").should("contain.text", timeStart);
  cy.get("[data-cy=meetup-time-finish]").should("contain.text", timeFinish);
  cy.get("[data-cy=meetup-speakers]").should("contain.text", speaker);
  cy.get("[data-cy=meetup-place]").should("have.text", place);
  cy.get("[data-cy=meetup-excerpt]").should("have.text", excerpt);
}
export function deleteMeetup({ subject }) {
  cy.get("[data-cy=meetup-delete]").last().click();
  cy.get("[data-cy=delete-meetup]").click();
  cy.get("[data-cy=to-moderated-meetups]").click();
  cy.get("[data-cy=meetup-component]").should("not.contain.text", subject);
}
