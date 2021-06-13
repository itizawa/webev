import { VFC } from 'react';
import Loader from 'react-loader-spinner';
import { useCurrentUser } from '~/stores/user';
import { UserIcon } from '~/components/Icons/UserIcon';

const Index: VFC = () => {
  //   const { t } = useLocale();
  const { data: currentUser } = useCurrentUser();
  console.log(currentUser);

  if (currentUser == null) {
    return (
      <div className="text-center pt-5">
        <Loader type="Triangle" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  return (
    <>
      <UserIcon image={currentUser.image} size={140} isCircle />
      <div>user name: {currentUser.name}</div>
      <div>user email: {currentUser.email}</div>
    </>
  );
};

export default Index;
