import { VFC } from 'react';
import { useCurrentUser } from '~/stores/user';

const Index: VFC = () => {
  //   const { t } = useLocale();
  const { data: currentUser } = useCurrentUser();
  console.log(currentUser);
  return (
    <>
      <div>user name: {currentUser?.name}</div>
      <div>user email: {currentUser?.email}</div>
    </>
  );
};

export default Index;
