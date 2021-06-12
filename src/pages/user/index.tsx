import { VFC } from 'react';
import { useCurrentUser } from '~/stores/user';

const Index: VFC = () => {
  //   const { t } = useLocale();
  const { data: currentUser } = useCurrentUser();
  console.log(currentUser);
  return <>hoge</>;
};

export default Index;
