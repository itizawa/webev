import { VFC, useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import { useCurrentUser } from '~/stores/user';
import { UserIcon } from '~/components/Icons/UserIcon';
import { toastError, toastSuccess } from '~/utils/toastr';
import { restClient } from '~/utils/rest-client';
import { useLocale } from '~/hooks/useLocale';
import { WebevOgpHead } from '~/components/Commons/WebevOgpHead';

const Index: VFC = () => {
  const { t } = useLocale();
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const [name, setName] = useState<string>();

  useEffect(() => {
    if (currentUser != null) {
      setName(currentUser.name);
    }
  }, [currentUser]);

  if (currentUser == null) {
    return (
      <div className="text-center pt-5">
        <Loader type="Triangle" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  const handleBlurTextInput = async (): Promise<void> => {
    // name is required
    if (name?.trim() === '') {
      return setName(currentUser.name);
    }
    // do nothing, no change
    if (name === currentUser.name) {
      return;
    }
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
          <div className="col-3">
            <UserIcon image={currentUser.image} size={140} isCircle />
          </div>
          <div className="col-9">
            <StyledInput
              className="form-control text-nowrap overflow-scroll fs-1 pt-0 pb-2 pb-md-0 me-auto w-100"
              onChange={(e) => setName(e.target.value)}
              onBlur={handleBlurTextInput}
              value={name || ''}
            />
            {/* TODO impl description*/}
            {/* <p>Hello 😄</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;

const StyledInput = styled.input`
  color: #ccc;
  background: transparent;
  border: none;

  &:hover {
    color: #ccc;
    background: #232323;
    ::placeholder {
      color: #ccc;
    }
  }

  &:focus {
    color: #ccc;
    background: transparent;
    ::placeholder {
      color: #ccc;
    }
  }
`;
