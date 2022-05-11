import {
  createMeetup,
  login,
  checkMeetupValues,
  deleteMeetup,
} from "../../utils/test.js";
describe("Meetup page", () => {
  const subject = "Testing subject";
  const excerpt = "Testing subject Testing subject Testing subject ";
  const time = "20";
  const speaker = "Madalyn Dickens";
  const timeStart = "1:00";
  const timeFinish = "2:00";
  const place = "Minsk";
  const newPlace = "BSU";
  const newExcerpt =
    "Testing subject Testing subject Testing subject Testing subject Testing subject Testing subject ";

  beforeEach(() => {
    cy.visit("http://localhost:4000/");
  });
  it("Switch languages", () => {
    cy.viewport(1650, 1024);
    cy.get("[data-cy=unauthorized-login]").click();
    cy.get("[data-cy=login]").type("Austyn");
    cy.get("[data-cy=password]").type("private");
    cy.get("[data-cy=login-submit]").click();
    cy.get("[data-cy=user-name]").click();
    cy.get("[data-cy=button-en]").click();
    cy.get("[data-cy=header-news]").should("have.text", "News");
    cy.get("[data-cy=header-meetup]").should("have.text", "Meetups");
    cy.get("[data-cy=meetups-list-header]").should("have.text", "Meetups");
    cy.get("[data-cy=to-themes]").should("have.text", "Themes");
    cy.get("[data-cy=to-moderated-meetups]").should("have.text", "Moderation");
    cy.get("[data-cy=to-futures-meetups]").should("have.text", "Futures");
    cy.get("[data-cy=to-past-meetups]").should("have.text", "Past");
    cy.get("[data-cy=button-ru]").click();
    cy.get("[data-cy=header-news]").should("have.text", "Новости");
    cy.get("[data-cy=header-meetup]").should("have.text", "Митапы");
    cy.get("[data-cy=meetups-list-header]").should("have.text", "Митапы");
    cy.get("[data-cy=to-themes]").should("have.text", "Темы");
    cy.get("[data-cy=to-moderated-meetups]").should("have.text", "Модерация");
    cy.get("[data-cy=to-futures-meetups]").should("have.text", "Будущие");
    cy.get("[data-cy=to-past-meetups]").should("have.text", "Прошедшие");
  });
  it("Create meetup", () => {
    cy.viewport(1650, 1024);
    login({ login: "Austyn", password: "private" });
    cy.wait(500);
    cy.get("[data-cy=to-create-page]").click();
    createMeetup({
      subject: subject,
      speaker: speaker,
      excerpt: excerpt,
      time: time,
      timeStart: timeStart,
      timeFinish: timeFinish,
      place: place,
    });
    checkMeetupValues({
      subject: subject,
      speaker: speaker,
      excerpt: excerpt,
      time: time,
      timeStart: timeStart,
      timeFinish: timeFinish,
      place: place,
    });
    cy.visit("http://localhost:4000/meetups/moderation");
    deleteMeetup({ subject: subject });
  });

  it("Edit meetup", () => {
    cy.viewport(1650, 1024);
    login({ login: "Austyn", password: "private" });
    cy.wait(500);
    cy.get("[data-cy=to-create-page]").click();
    createMeetup({
      subject: subject,
      speaker: speaker,
      excerpt: excerpt,
      time: time,
      timeStart: timeStart,
      timeFinish: timeFinish,
      place: place,
    });
    cy.visit("http://localhost:4000/meetups/moderation");
    cy.get("[data-cy=meetup-edit]").last().click();
    cy.get("[data-cy=meetup-edit-place]").clear();
    cy.get("[data-cy=meetup-edit-place]").type(newPlace);
    cy.get("[data-cy=meetup-edit-excerpt]").clear();
    cy.get("[data-cy=meetup-edit-excerpt]").type(newExcerpt);
    cy.get("[data-cy=meetup-edit-save]").click();
    checkMeetupValues({
      subject: subject,
      speaker: speaker,
      excerpt: newExcerpt,
      time: time,
      timeStart: timeStart,
      timeFinish: timeFinish,
      place: newPlace,
    });
    cy.visit("http://localhost:4000/meetups/moderation");
    deleteMeetup({ subject: subject });
  });

  it("Is errors visible on meetup  creation page", () => {
    cy.viewport(1650, 1024);
    login({ login: "Austyn", password: "private" });
    cy.wait(500);
    cy.get("[data-cy=to-create-page]").click();
    cy.get("[data-cy=creation-to-additional]").click();
    cy.get("[data-cy=subject-error]").should("be.visible");
    cy.get("[data-cy=speaker-error]").should("be.visible");
    cy.get("[data-cy=excerpt-error]").should("be.visible");
  });
});
