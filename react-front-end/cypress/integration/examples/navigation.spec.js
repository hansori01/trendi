//test header components

describe("Navigation", () => {
  it("should navigate the header to trending topic and navigate back", () => {
    cy.visit("/");
    cy.contains('Choose a location to see trends');
    cy.get('.canada').click()
    cy.contains('Trending in Canada..')
    cy.get('.MuiChip-label').first().click()

    cy.get('Button.backButton')
    cy.contains('Back').click()
    cy.contains('Choose a location to see trends')
  });
})