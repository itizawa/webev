import renderer from 'react-test-renderer';
import { PageListItem } from './index';
import { generateMockPage } from '~/mock/generateMockPage';

const mockPage = generateMockPage();
test('PageListItem', () => {
  const tree = renderer.create(<PageListItem page={mockPage} isHideArchiveButton={false} />).toJSON();

  expect(tree).toMatchSnapshot();
});

test('PageList with isHideArchiveButton is true', () => {
  const tree = renderer.create(<PageListItem page={mockPage} isHideArchiveButton />).toJSON();

  expect(tree).toMatchSnapshot();
});
