import React from 'react';
import ThemeSelector from './ThemeSelector';

describe('<ThemeSelector />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ThemeSelector />);
  });
});
