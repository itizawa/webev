import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import 'jsdom-global/register';

jest.mock('next/router', () => ({
  useRouter: () => {
    return { locale: 'ja' };
  },
}));

Enzyme.configure({ adapter: new Adapter() });
