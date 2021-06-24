import { VFC } from 'react';
import Loader from 'react-loader-spinner';
// import { useFileUpload } from 'use-file-upload';
import styled from 'styled-components';

import { useCurrentUser } from '~/stores/user';
import { toastError, toastSuccess } from '~/utils/toastr';
import { restClient } from '~/utils/rest-client';
import { useLocale } from '~/hooks/useLocale';

import { UserIcon } from '~/components/Icons/UserIcon';
import { WebevOgpHead } from '~/components/Commons/WebevOgpHead';
import { EditableInput } from '~/components/Atoms/EditableInput';

const Index: VFC = () => {
  const { t } = useLocale();
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  // const [userImage, setUserImage] = useFileUpload();

  if (currentUser == null) {
    return (
      <div className="text-center pt-5">
        <Loader type="Triangle" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  const handleBlurTextInput = async (name: string): Promise<void> => {
    try {
      await restClient.apiPut('/users/me', { name });
      mutateCurrentUser();
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
              <UserIcon image={currentUser.image} size={140} isCircle />
            </StyledDiv>
          </div>
          <div className="col-9">
            <EditableInput onSubmit={handleBlurTextInput} value={currentUser.name} />
            {/* TODO impl description*/}
            {/* <p>Hello 😄</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;

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
