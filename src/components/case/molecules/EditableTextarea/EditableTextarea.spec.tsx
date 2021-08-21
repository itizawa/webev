import renderer from 'react-test-renderer';
import { EditableTextarea } from './index';

test('EditableTextarea', () => {
  const tree = renderer.create(<EditableTextarea onChange={expect.any(Function)} />).toJSON();

  expect(tree).toMatchSnapshot();
});

test('EditableTextarea is header', () => {
  const tree = renderer.create(<EditableTextarea onChange={expect.any(Function)} isHeader />).toJSON();

  expect(tree).toMatchSnapshot();
});
