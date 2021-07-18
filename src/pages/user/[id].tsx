import Link from 'next/link';
import { VFC } from 'react';
import Loader from 'react-loader-spinner';

import { useRouter } from 'next/router';
import { useCurrentUser, useUserById } from '~/stores/user';
import { toastError, toastSuccess } from '~/utils/toastr';
import { restClient } from '~/utils/rest-client';
import { useLocale } from '~/hooks/useLocale';

import { UserIcon } from '~/components/Icons/UserIcon';
import { WebevOgpHead } from '~/components/Commons/WebevOgpHead';
import { EditableInput } from '~/components/case/molecules/EditableInput';

const Index: VFC = () => {
  const { t } = useLocale();
  const router = useRouter();

  const { data: currentUser, mutate: mutateCurrentUser, isValidating: isValidatingCurrentUser } = useCurrentUser();
  const { data: user, mutate: mutateUserById, isValidating: isValidatingUser } = useUserById({ id: router.query.id as string });

  if (isValidatingCurrentUser || isValidatingUser) {
    return (
      <div className="text-center pt-5">
        <Loader type="Triangle" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  if (user == null) {
    return (
      <div className="p-3">
        <h1 className="m-3">{t.this_is_the_404_page}</h1>
        <h2>
          <Link href="/">
            <a className="text-white webev-anchor">{t.go_to_top}</a>
          </Link>
        </h2>
      </div>
    );
  }

  const handleBlurTextInput = async (name: string): Promise<void> => {
    try {
      await restClient.apiPut('/users/me', { properity: { name } });
      mutateCurrentUser();
      mutateUserById();
      toastSuccess('success');
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.user}`} />
      <div className="container">
        <div className="row mt-3">
          <div className="col-3 text-center">
            <UserIcon image={user.image} size={140} isCircle />
          </div>
          <div className="col-9">
            {currentUser?._id === user._id ? <EditableInput onSubmit={handleBlurTextInput} value={user.name} isHeader /> : <h1 className="p-2">{user.name}</h1>}
            {/* TODO impl description*/}
            {/* <p>Hello 😄</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
