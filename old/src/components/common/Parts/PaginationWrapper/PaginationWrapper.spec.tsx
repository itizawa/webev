import renderer from 'react-test-renderer';
import { PaginationWrapper } from './index';

test('PaginationWrapper', () => {
  const tree = renderer.create(<PaginationWrapper totalItemsCount={100} pagingLimit={20} activePage={3} mutateActivePage={expect.any(Function)} />).toJSON();

  expect(tree).toMatchSnapshot();
});
