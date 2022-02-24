import renderer from 'react-test-renderer';
import { PageManageDropdown } from './index';
import { generateMockPage } from '~/mock/generateMockPage';

const mockPage = generateMockPage();

test('PageManageDropdown isHideArchiveButton is true', () => {
  const tree = renderer
    .create(
      <PageManageDropdown
        page={mockPage}
        onClickDeleteButton={() => console.log('test')}
        onClickRemovePageButton={() => console.log('test')}
        onClickAddPageToDirectoryButton={() => console.log('test')}
        onClickFetchButton={() => console.log('test')}
      />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

mockPage.directoryId = undefined;
test('PageManageDropdown directoryId is undefined', () => {
  const tree = renderer
    .create(
      <PageManageDropdown
        page={mockPage}
        onClickDeleteButton={() => console.log('test')}
        onClickRemovePageButton={() => console.log('test')}
        onClickAddPageToDirectoryButton={() => console.log('test')}
        onClickFetchButton={() => console.log('test')}
      />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

global.navigator = {
  ...global.navigator,
  share: jest.fn(),
};

test('PageManageDropdown directoryId is undefined', () => {
  const tree = renderer
    .create(
      <PageManageDropdown
        page={mockPage}
        onClickDeleteButton={() => console.log('test')}
        onClickRemovePageButton={() => console.log('test')}
        onClickAddPageToDirectoryButton={() => console.log('test')}
        onClickFetchButton={() => console.log('test')}
      />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
