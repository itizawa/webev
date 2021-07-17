import { VFC, useState, useEffect } from 'react';

import styled from 'styled-components';
import Loader from 'react-loader-spinner';

import { WebevOgpHead } from '~/components/Commons/WebevOgpHead';

import { IconButton } from '~/components/Icons/IconButton';
import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';
import { DirectoryListItem } from '~/components/Directory/DirectoryListItem';

import { useDirectoryListSWR } from '~/stores/directory';
import { usePageStatus } from '~/stores/page';
import { useLocale } from '~/hooks/useLocale';

import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';
import { BootstrapColor, BootstrapIcon } from '~/interfaces/variables';
import { PageStatus } from '~/domains/Page';

const Index: VFC = () => {
  const { t } = useLocale();

  const { data: paginationResult, mutate: mutateDirectoryList } = useDirectoryListSWR();
  const { mutate: mutatePageStatus } = usePageStatus();

  const [isCreatingNewDirectory, setIsCreatingNewDirectory] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    mutatePageStatus([PageStatus.PAGE_STATUS_ARCHIVE, PageStatus.PAGE_STATUS_STOCK]);
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (name.trim() === '') {
      return setIsCreatingNewDirectory(false);
    }

    try {
      await restClient.apiPost('/directories', { name });
      toastSuccess(t.toastr_save_directory);
      setName('');
      mutateDirectoryList();
    } catch (err) {
      toastError(err);
    }

    setIsCreatingNewDirectory(false);
  };
  return (
    <>
      <WebevOgpHead title={`Webev | ${t.directory}`} />
      <LoginRequiredWrapper>
        <div className="p-3">
          <h1>{t.directory}</h1>
          {paginationResult == null && (
            <div className="text-center pt-5">
              <Loader type="Triangle" color="#00BFFF" height={100} width={100} />
            </div>
          )}
          {paginationResult != null && (
            <>
              <div className="row">
                {paginationResult.docs.map((directory) => (
                  <div className="col-xl-4 col-md-6" key={directory._id}>
                    <DirectoryListItem directory={directory} />
                  </div>
                ))}
              </div>
              {paginationResult?.docs.length < 10 && (
                <StyledDiv className="text-center mx-3 mt-2 d-md-none">
                  {isCreatingNewDirectory ? (
                    <form className="input-group ps-3" onSubmit={onSubmit}>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control bg-white"
                        placeholder="...name"
                        autoFocus
                      />
                    </form>
                  ) : (
                    <IconButton
                      icon={BootstrapIcon.PLUS_DOTTED}
                      color={BootstrapColor.LIGHT}
                      activeColor={BootstrapColor.LIGHT}
                      onClickButton={() => setIsCreatingNewDirectory(true)}
                    />
                  )}
                </StyledDiv>
              )}
            </>
          )}
        </div>
      </LoginRequiredWrapper>
    </>
  );
};

const StyledDiv = styled.div`
  > .btn {
    width: 100%;
    padding: 10px;
    border-radius: 3px;
    :hover {
      background-color: rgba(200, 200, 200, 0.2);
      transition: all 300ms linear;
    }
  }
`;

export default Index;
