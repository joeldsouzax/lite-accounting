import React from 'react';
import Authentication from './Authentication';

describe('<Authentication />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Authentication />);
  });
});
