import { useState, ReactNode } from 'react';

import styled from 'styled-components';

import { WebevNextPage } from '~/libs/interfaces/webevNextPage';

import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { DirectoryListItem } from '~/components/domain/Directory';

import { useDirectoryPaginationResult } from '~/stores/directory';
import { useLocale } from '~/hooks/useLocale';

import { toastError, toastSuccess } from '~/utils/toastr';
import { DashBoardLayout } from '~/components/common/Layout/DashBoardLayout';

const Page: WebevNextPage = () => {
  const { t } = useLocale();

  // const [searchKeyWord, setSearchKeyWord] = useState('');
  const { data: directoryPaginationResult } = useDirectoryPaginationResult({
    searchKeyWord: '',
    isRoot: true,
  });
  // const { createDirectory } = useCreateDirectory();

  const [, setIsCreatingNewDirectory] = useState(false);
  const [name, setName] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (name.trim() === '') {
      return setIsCreatingNewDirectory(false);
    }

    try {
      toastSuccess(t.toastr_save_directory);
      setName('');
      // const result = await createDirectory(name);
      // if (directoryPaginationResult) {
      //   mutateDirectoryPaginationResult(
      //     {
      //       ...directoryPaginationResult,
      //       docs: [...directoryPaginationResult.docs, result],
      //     },
      //     false,
      //   );
      // }
    } catch (err) {
      if (err instanceof Error) toastError(err);
    }

    setIsCreatingNewDirectory(false);
  };
  return (
    <>
      <WebevOgpHead title={`Webev | ${t.directory}`} />
      <LoginRequiredWrapper>
        <h1 className="mb-0">{t.directory}</h1>
        <div className="my-3 d-flex flex-column flex-sm-row justify-content-between gap-3">
          {/* <SearchTextBox onChange={(inputValue) => setSearchKeyWord(inputValue)} /> */}
        </div>
        {directoryPaginationResult == null && (
          <div className="pt-5 d-flex align-items-center justify-content-center">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {directoryPaginationResult != null && (
          <>
            <div className="row">
              {directoryPaginationResult.docs.map((directory) => (
                <div className="col-xl-4 col-md-6" key={directory._id}>
                  <DirectoryListItem directory={directory} />
                </div>
              ))}
            </div>
            {directoryPaginationResult.docs.length < 10 && (
              <StyledDiv className="text-center mx-3 mt-2 d-md-none">
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
              </StyledDiv>
            )}
          </>
        )}
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

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

Page.getLayout = getLayout;
export default Page;
