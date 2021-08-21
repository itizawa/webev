import renderer from 'react-test-renderer';
import { EditableInput } from './index';

test('EditableInput', () => {
  const tree = renderer.create(<EditableInput onChange={expect.any(Function)} />).toJSON();

  expect(tree).toMatchSnapshot();
});

test('EditableInput is header', () => {
  const tree = renderer.create(<EditableInput onChange={expect.any(Function)} isHeader />).toJSON();

  expect(tree).toMatchSnapshot();
});
