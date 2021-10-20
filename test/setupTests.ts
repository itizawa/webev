import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import 'jsdom-global/register';
import { ReactNode } from 'react';

jest.mock('next/router', () => ({
  useRouter: () => {
    return { locale: 'ja' };
  },
}));

jest.mock('next/link', () => {
  return ({ children }: { children: ReactNode }) => {
    return children;
  };
});

Enzyme.configure({ adapter: new Adapter() });
