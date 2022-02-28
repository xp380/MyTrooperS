describe("Scénario sur la lecture du ticket", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.wait(2000);

    // Saisir les données personnelles
    cy.get('[id="email"]').click().type("vincentkouoi@free.fr");

    cy.get('[id="password"]').click().type("vincent");

    cy.contains("Submit").click({ force: true });
    cy.wait(1000);
  });

  it("Supprimer un ticket", () => {
    cy.viewport(1520, 680);

    cy.contains("List").click({ force: true });
    cy.wait(1000);
    cy.get('[class="ant-card ant-card-bordered"]').should("have.length", 5);

    cy.get('[data-icon="delete"]').first().click({ force: true });
    cy.wait(2000);
    cy.get('[class="ant-card ant-card-bordered"]').should("have.length", 4);
  });
});
