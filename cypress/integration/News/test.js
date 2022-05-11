import { login } from "../../utils/test";

describe("News page", () => {
  const newsTitle = "Testing title for news";
  const newsText =
    "Testing text for news Testing text for news Testing text for news Testing text for news Testing text for news";
  const newTitle = "Some new title for test";
  const newText = "Some new title for test";

  beforeEach(() => {
    cy.visit("http://localhost:4000/");
  });
  it("should not display news creation, editing and deleting buttons if user not have moderator role", () => {
    cy.viewport(1650, 1024);
    login({ login: "Winnifred", password: "private" });
    cy.get("[data-cy=header-news]").click();
    cy.get("[data-cy=news-creation-button]").should("not.exist");
    cy.get("[data-cy=news-component]").first().click();
    cy.get("[data-cy=news-page-button-delete]").should("not.exist");
    cy.get("[data-cy=news-edit-button]").should("not.exist");
  });

  it("Create news", () => {
    cy.viewport(1650, 1024);
    login({ login: "Austyn", password: "private" });
    cy.get("[data-cy=header-news]").click();
    cy.get("[data-cy=news-creation-button]").click();
    cy.get("[data-cy=news-creation-title]").type(newsTitle);
    cy.get("[data-cy=news-creation-text]").type(newsText);
    cy.get("[data-cy=news-creation-button]").click();
    cy.get("[data-cy=news-delete-button]").click();
    cy.get("[data-cy=news-component]").should("not.contain.text", newsTitle);
  });
  it("Edit news", () => {
    cy.viewport(1650, 1024);
    login({ login: "Austyn", password: "private" });
    cy.get("[data-cy=header-news]").click();
    cy.get("[data-cy=news-creation-button]").click();
    cy.get("[data-cy=news-creation-title]").type(newsTitle);
    cy.get("[data-cy=news-creation-text]").type(newsText);
    cy.get("[data-cy=news-creation-button]").click();
    cy.get("[data-cy=news-edit-button]").click();
    cy.get("[data-cy=news-editing-title]").clear();
    cy.get("[data-cy=news-editing-title]").type(newTitle);
    cy.get("[data-cy=news-editing-text]").clear();
    cy.get("[data-cy=news-editing-text]").type(newText);
    cy.get("[data-cy=news-edit-button]").click();
    cy.get("[data-cy=news-delete-button]").click();
    cy.get("[data-cy=news-component]").should("not.contain.text", newTitle);
  });
});
