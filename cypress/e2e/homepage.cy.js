describe("Homepage", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:9000/films", {
      fixture: "films.json",
    }).as("getFilms");
    cy.visit("/");
    // cy.wait("@getFilms");
  });

  it("displays films fetched from the API", () => {
    cy.get(".homepage").should("be.visible");
    cy.get(".homepage h1").should("contain", "فیلم ها");
    cy.get(".homepage ul li").should("have.length", 6);
  });

  it("deletes a film when delete button is clicked", () => {
    cy.get(".homepage ul li").first().as("firstFilm");
    cy.get("@firstFilm")
      .find("h2")
      .invoke("text")
      .then((title) => {
        cy.get("@firstFilm").find("button").click();
        cy.get("@firstFilm").should("not.exist");
        cy.get(".homepage ul li").should("not.contain", title);
      });
  });

  it("persists film list in local storage after deletion", () => {
    cy.get(".homepage ul li").first().as("firstFilm");
    cy.get("@firstFilm").find("button").click();
    cy.reload();
    cy.get(".homepage ul li").should("have.length", 5);
  });
});
