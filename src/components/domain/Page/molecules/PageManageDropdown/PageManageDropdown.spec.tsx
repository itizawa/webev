import renderer from 'react-test-renderer';
import { PageManageDropdown } from './index';
import { generateMockPage } from '~/mock/generateMockPage';

const mockPage = generateMockPage();

jest.mock('next/router', () => ({
  useRouter: () => {
    return { locale: 'ja' };
  },
}));
test('PageManageDropdown isHideArchiveButton ois true', () => {
  const tree = renderer
    .create(
      <PageManageDropdown
        page={mockPage}
        isHideArchiveButton
        onClickDeleteButton={expect.any(Function)}
        onClickSharePageButton={expect.any(Function)}
        onClickSwitchArchiveButton={expect.any(Function)}
        onClickRemovePageButton={expect.any(Function)}
      />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test('PageManageDropdown isHideArchiveButton ois true', () => {
  const tree = renderer
    .create(
      <PageManageDropdown
        page={mockPage}
        isHideArchiveButton={false}
        onClickDeleteButton={expect.any(Function)}
        onClickSharePageButton={expect.any(Function)}
        onClickSwitchArchiveButton={expect.any(Function)}
        onClickRemovePageButton={expect.any(Function)}
      />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
