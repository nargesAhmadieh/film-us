describe("Homepage", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:9000/films").as("getFilms");
    cy.visit("/");
    cy.wait("@getFilms");
  });

  it("displays films fetched from the API", () => {
    cy.get("._homepage_jlns0_1").should("be.visible");
    cy.get("._homepage_jlns0_1 h1").should("contain", "فیلم ها");
    cy.get("._homepage_jlns0_1 ul li").should("have.length", 6);
  });

  it("deletes a film when delete button is clicked", () => {
    cy.get("._homepage_jlns0_1 ul li").first().as("firstFilm");
    cy.get("@firstFilm")
      .find("h2")
      .invoke("text")
      .then((title) => {
        cy.get("@firstFilm").find("button").click();
        cy.get("._homepage_jlns0_1 ul li").should("not.contain", title);
      });
  });

  it("persists film list in local storage after deletion", () => {
    cy.get("._homepage_jlns0_1 ul li").first().as("firstFilm");
    cy.get("@firstFilm").find("button").click();
    cy.get("._homepage_jlns0_1 ul li").should("have.length", 5);
  });
});
