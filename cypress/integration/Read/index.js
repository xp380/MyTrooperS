describe("Scénario sur la lecture du ticket", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.wait(2000);

    // Saisir les données personnelles
    cy.get('[id="email"]').click().type("vincentkouoi@free.fr");

    cy.get('[type="password"]').click().type("vincent");

    cy.contains("Submit").click({ force: true });
    cy.wait(1000);
  });

  it("Lire le titre et la description de l'objet", () => {
    cy.viewport(1520, 680);

    cy.contains("List").click({ force: true });
    cy.wait(1000);
    cy.get('[class="ant-card ant-card-bordered"]')
      .first()
      .contains("Test Demo 8")
      .should("be.visible");
  });
});
