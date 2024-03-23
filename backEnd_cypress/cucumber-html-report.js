const cucumberHtmlReporter = require('cucumber-html-reporter');

module.exports = (on, config) => {
  on('after:run', (results) => {
    cucumberHtmlReporter.generate({
      jsonFile: 'cypress/jsonlogs/log.json',
      output: 'cypress/reports/cucumber-htmlreport.html',
      reportSuiteAsScenarios: true,
      theme: 'bootstrap',
    });
  });
};