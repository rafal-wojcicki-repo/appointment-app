import { defineConfig } from 'cypress';
// @ts-ignore
import browserify from '@cypress/browserify-preprocessor';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      // register cucumber preprocessor
      const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
      addCucumberPreprocessorPlugin(on, config);

      on('file:preprocessor', browserify({ typescript: require.resolve('typescript') }));

      return config;
    }
  }
});

