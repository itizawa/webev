import Link from 'next/link';
import { ReactNode } from 'react';
import Loader from 'react-loader-spinner';
// import { useFileUpload } from 'use-file-upload';
import styled from 'styled-components';

import { useRouter } from 'next/router';
import { useCurrentUser, useUserById } from '~/stores/user';
import { toastError } from '~/utils/toastr';
import { restClient } from '~/utils/rest-client';
import { useLocale } from '~/hooks/useLocale';

import { UserIcon } from '~/components/domain/User/atoms/UserIcon';
import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { EditableInput } from '~/components/case/molecules/EditableInput';
import { EditableTextarea } from '~/components/case/molecules/EditableTextarea';
import { WebevNextPage } from '~/interfaces/webevNextPage';
import { DashBoardLayout } from '~/components/common/Layout/DashBoardLayout';

const Page: WebevNextPage = () => {
  const { t } = useLocale();
  // const [userImage, setUserImage] = useFileUpload();
  const router = useRouter();

  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: user, isValidating: isValidatingUser } = useUserById({ userId: router.query.id as string });

  if (isValidatingUser) {
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

  const updateName = async (name: string): Promise<void> => {
    try {
      await restClient.apiPut('/users/me', { property: { name } });
      mutateCurrentUser();
    } catch (err) {
      toastError(err);
    }
  };

  const updateDescription = async (description: string): Promise<void> => {
    try {
      await restClient.apiPut('/users/me', { property: { description } });
      mutateCurrentUser();
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.user_page}`} />
      <div className="row mt-3">
        <div className="col-md-3 col-12 text-center mb-3">
          <StyledDiv
            className="position-relative"
            role="button"
            // onClick={() => {
            //   setUserImage({ accept: 'image/*' }, ({ source, name, size, file }) => {
            //     console.log({ source, name, size, file });
            //   });
            // }}
          >
            <span className="position-absolute fw-bold fs-4">New Image</span>
            <UserIcon image={user.image} size={140} isCircle />
          </StyledDiv>
        </div>
        <div className="col-md-9 col-12 d-flex flex-column gap-2">
          {currentUser?._id === user._id ? <EditableInput onChange={updateName} value={user.name} isHeader /> : <h1 className="p-2">{user.name}</h1>}
          {currentUser?._id === user._id ? (
            <EditableTextarea value={user.description} onChange={updateDescription} isAllowEmpty placeholder={t.no_description} />
          ) : (
            <p className="p-2">{user.description}</p>
          )}
        </div>
      </div>
    </>
  );
};

const StyledDiv = styled.div`
  :hover {
    > img {
      opacity: 0.5;
    }
    > span {
      display: block;
    }
  }

  > span {
    top: 50%;
    left: 50%;
    z-index: 10;
    display: none;
    transform: translate(-50%, -50%);
  }
`;
const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

Page.getLayout = getLayout;
export default Page;
