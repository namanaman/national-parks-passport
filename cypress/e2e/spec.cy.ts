describe("Navigation", () => {
  it("should navigate to the about page", () => {
    cy.intercept("https://developer.nps.gov/api/v1/activities?api_key*", {
      fixture: "activities.json",
    });

    // Start from the index page
    cy.visit("http://localhost:3000/");

    cy.intercept("https://developer.nps.gov/api/v1/activities/parks*", {
      fixture: "parks.json",
    });

    // The new page should contain an h1 with "About"
    cy.get("h1").contains("National Parks Passport");
  });
});
