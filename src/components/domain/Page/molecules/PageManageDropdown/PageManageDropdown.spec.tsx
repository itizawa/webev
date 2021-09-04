import renderer from 'react-test-renderer';
import { PageManageDropdown } from './index';
import { generateMockPage } from '~/mock/generateMockPage';

const mockPage = generateMockPage();

test('PageManageDropdown isHideArchiveButton ois true', () => {
  const tree = renderer
    .create(
      <PageManageDropdown
        page={mockPage}
        isHideArchiveButton
        onClickDeleteButton={() => console.log('test')}
        onClickSwitchArchiveButton={() => console.log('test')}
        onClickRemovePageButton={() => console.log('test')}
        onClickAddPageToDirectoryButton={() => console.log('test')}
      />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test('PageManageDropdown isHideArchiveButton is true', () => {
  const tree = renderer
    .create(
      <PageManageDropdown
        page={mockPage}
        isHideArchiveButton={false}
        onClickDeleteButton={() => console.log('test')}
        onClickSwitchArchiveButton={() => console.log('test')}
        onClickRemovePageButton={() => console.log('test')}
        onClickAddPageToDirectoryButton={() => console.log('test')}
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
        isHideArchiveButton={false}
        onClickDeleteButton={() => console.log('test')}
        onClickSwitchArchiveButton={() => console.log('test')}
        onClickRemovePageButton={() => console.log('test')}
        onClickAddPageToDirectoryButton={() => console.log('test')}
      />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
