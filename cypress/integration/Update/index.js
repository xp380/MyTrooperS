describe("Scénario sur la modification du ticket", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.wait(2000);

    // Saisir les données personnelles
    cy.get('[id="email"]').click().type("vincentkouoi@free.fr");

    cy.get('[id="password"]').click().type("vincent");

    cy.contains("Submit").click({ force: true });
    cy.wait(1000);
  });

  it("Modifier le titre et la description du ticket", () => {
    cy.viewport(1520, 680);

    cy.contains("List").click({ force: true });
    cy.wait(1000);

    cy.get('[class="ant-card-head-title"]').first().dblclick();
    cy.get('[value="Hyper TrooperS"]')
      .clear()
      .click({ force: true })
      .type("Hyper TrooperS{enter}");
    cy.wait(2000);
    cy.get('[class="ant-card-head-title"]').first().dblclick();
    cy.get('[value="Super Transports"]')
      .clear()
      .click({ force: true })
      .type("Super Transports{enter}");
  });

  it("Vérifier la mise à jour de la valeur", () => {
    cy.viewport(1520, 680);

    cy.contains("List").click({ force: true });
    cy.wait(1000);

    cy.get('[class="ant-card-head"]')
      .first()
      .contains("Hyper TrooperS")
      .should("be.visible");
    cy.get('[class="ant-card-body"]')
      .first()
      .contains("Super Transports")
      .should("be.visible");
  });
});
