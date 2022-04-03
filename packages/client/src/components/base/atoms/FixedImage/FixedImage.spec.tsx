import renderer from 'react-test-renderer';
import { FixedImage } from './index';

test('FixedImage', () => {
  const tree = renderer.create(<FixedImage imageUrl="example.png" />).toJSON();

  expect(tree).toMatchSnapshot();
});

test('FixedImage imageUrl is null', () => {
  const tree = renderer.create(<FixedImage />).toJSON();

  expect(tree).toMatchSnapshot();
});
