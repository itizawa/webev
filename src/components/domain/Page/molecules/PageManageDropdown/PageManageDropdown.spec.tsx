import renderer from 'react-test-renderer';
import { PageManageDropdown } from './index';
import { generateMockPage } from '~/mock/generateMockPage';

const mockPage = generateMockPage();

test('PageManageDropdown isHideArchiveButton is true', () => {
  const tree = renderer.create(<PageManageDropdown page={mockPage} onClickFetchButton={() => console.log('test')} />).toJSON();

  expect(tree).toMatchSnapshot();
});

test('PageManageDropdown directoryId is undefined', () => {
  const tree = renderer.create(<PageManageDropdown page={mockPage} onClickFetchButton={() => console.log('test')} />).toJSON();

  expect(tree).toMatchSnapshot();
});

global.navigator = {
  ...global.navigator,
  share: jest.fn(),
};

test('PageManageDropdown directoryId is undefined', () => {
  const tree = renderer.create(<PageManageDropdown page={mockPage} onClickFetchButton={() => console.log('test')} />).toJSON();

  expect(tree).toMatchSnapshot();
});
