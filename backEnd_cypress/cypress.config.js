const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");


async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );
  return config;
}

module.exports = defineConfig({  
  e2e: {
    setupNodeEvents,
    specPattern: "**/*.{feature,features}",
    responseTimeout: 15000,
    baseUrl: "https://pokeapi.co/api/v2/pokemon/",
    stepDefinitions: [
      "cypress/e2e/step_definitions/**/*.js",
      "cypress/e2e/step_definitions/**/*.ts",
    ], 
  }
});
