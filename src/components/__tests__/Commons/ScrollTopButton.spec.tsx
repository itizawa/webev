import React from 'react';
import renderer from 'react-test-renderer';
import { ScrollTopButton } from '../../Commons/ScrollTopButton';

test('ScrollTopButton', () => {
  const component = renderer.create(<ScrollTopButton />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
