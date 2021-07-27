import renderer from 'react-test-renderer';
import { ScrollTopButton } from './index';

jest.mock('./hooks', () => ({
  useHooks: () => {
    return { isShowScroll: false, scrollTop: jest.fn() };
  },
}));
test('ScrollTopButton isShowScroll is false', () => {
  const tree = renderer.create(<ScrollTopButton />).toJSON();

  expect(tree).toMatchSnapshot();
});

jest.mock('./hooks', () => ({
  useHooks: () => {
    return { isShowScroll: false, scrollTop: jest.fn() };
  },
}));
test('ScrollTopButton isShowScroll is true', () => {
  const tree = renderer.create(<ScrollTopButton />).toJSON();

  expect(tree).toMatchSnapshot();
});
