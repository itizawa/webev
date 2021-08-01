import renderer from 'react-test-renderer';
import { Tooltip } from './index';

test('Tooltip', () => {
  const tree = renderer
    .create(
      <Tooltip text="Tooltip" placement="bottom">
        target
      </Tooltip>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test('Tooltip without placement', () => {
  const tree = renderer.create(<Tooltip text="Tooltip">target</Tooltip>).toJSON();

  expect(tree).toMatchSnapshot();
});

test('Tooltip with fade', () => {
  const tree = renderer
    .create(
      <Tooltip text="Tooltip" fade>
        target
      </Tooltip>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
