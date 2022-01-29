import renderer from 'react-test-renderer';
import { PageCard } from './index';
import { generateMockPage } from '~/mock/generateMockPage';

const mockPage = generateMockPage();
test('PageCard', () => {
  const tree = renderer.create(<PageCard page={mockPage} isHideArchiveButton={false} />).toJSON();

  expect(tree).toMatchSnapshot();
});

test('PageCard with isHideArchiveButton is true', () => {
  const tree = renderer.create(<PageCard page={mockPage} isHideArchiveButton />).toJSON();

  expect(tree).toMatchSnapshot();
});
