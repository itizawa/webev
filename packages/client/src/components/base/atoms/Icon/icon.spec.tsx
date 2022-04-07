import renderer from 'react-test-renderer';
import { Icon } from './index';

test('Icon', () => {
  const tree = renderer.create(<Icon icon="ARROW" color="LIGHT" />).toJSON();

  expect(tree).toMatchSnapshot();
});

test('Icon with width and height', () => {
  const tree = renderer.create(<Icon width={32} height={32} icon="ARROW" color="LIGHT" />).toJSON();

  expect(tree).toMatchSnapshot();
});
