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
      <div className="container">
        <div className="row mt-3">
          <div className="col-3">
            <UserIcon image={currentUser.image} size={140} isCircle />
          </div>
          <div className="col-9">
            <h1>{currentUser.name}</h1>
            <p>Hello 😄</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
