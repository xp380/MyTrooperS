describe("Scénario sur la création du ticket", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.wait(2000);

    // Saisir les données personnelles
    cy.get('[id="email"]').click().type("vincentkouoi@free.fr");

    cy.get('[type="password"]').click().type("vincent");

    cy.contains("Submit").click({ force: true });
  });

  it("Créér le ticket", () => {
    cy.viewport(1520, 680);
    cy.get('[class="ant-layout-content content"]')
      .contains("Page de Formulaire")
      .should("be.visible");

    cy.get('[placeholder="Enter your title"]')
      .click({ force: true })
      .type("Candidat");

    cy.get('[placeholder="Enter your description"]')
      .click({ force: true })
      .type("développeur fullstack");
    cy.get('[type="select"]').select("Terminé");

    cy.contains("Submit").click({ force: true });
  });

  it("Vérifier le ticket créé", () => {
    cy.viewport(1520, 680);
    cy.get('[class="ant-layout-content content"]')
      .contains("Page de Formulaire")
      .should("be.visible");

    cy.contains("List").click({ force: true });
    cy.wait(1000);

    cy.get('[class="ant-card ant-card-bordered"]')
      .last()
      .contains("Terminé")
      .should("be.visible");
  });
});

// "En cours", "Terminé", "A faire"
