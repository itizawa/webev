import renderer from 'react-test-renderer';
import { PageCountupCard } from './index';

test('PageCountupCard', () => {
  const tree = renderer.create(<PageCountupCard count={100} text="Total Page" />).toJSON();

  expect(tree).toMatchSnapshot();
});
