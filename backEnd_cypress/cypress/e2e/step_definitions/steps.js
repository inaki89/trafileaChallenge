import { Given } from "@badeball/cypress-cucumber-preprocessor";
import "cypress-plugin-api";

Given("I get all pokemons from the endpoint {string}", (url) => {
  // Perform the first request to get all Pokémon
  cy.api({
    method: "GET",
    url: url,
    headers: {
      "Content-Type": "application/json",
    }
  }).then((response) => {
    // Check the status code of the first request
    let status = response.status;
    cy.log("The status of the first request is " + status);
    expect(status).to.equal(200);

    // Get the name of the first Pokémon in the list
    let firstPokemonName = response.body.results[0].name;
    cy.log("The name of the first Pokemon is: " + firstPokemonName);

    // Build the URL for the second request with the name of the first Pokémon
    let pokemonDetailsUrl = url + firstPokemonName;

    // Perform the second request to get specific details of the first Pokémon
    cy.api({
      method: "GET",
      url: pokemonDetailsUrl,
      headers: {
        "Content-Type": "application/json",
      }
    }).then((response) => {
      // Check the status code of the second request
      let status = response.status;
      cy.log("The status of the second request is " + status);
      expect(status).to.equal(200);

      // Get the name of the Pokemon from the response
      let pokemonName = response.body.name;
      cy.log("The name of the Pokemon in the response is: " + pokemonName);

      // Validate that the name of the Pokemon in the response matches the name of the first Pokemon
      expect(pokemonName).to.equal(firstPokemonName);

      // Assert the species name is equal to the Pokemon's name
      let speciesName = response.body.species.name;
      cy.log("The species name of the Pokemon in the response is: " + speciesName);
      expect(speciesName).to.equal(pokemonName);
    });
  });
});
