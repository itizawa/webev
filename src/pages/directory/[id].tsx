import { VFC } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';

import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';
import { DashBoardLayout } from '~/components/Layout/DashBoardLayout';

import { useDirectoryInfomation, usePageListByDirectoryId } from '~/stores/directory';
import { OgpCard } from '~/components/organisms/OgpCard';

const FORMAT = 'yyyy/MM/dd HH:MM';

const Index: VFC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: directory } = useDirectoryInfomation(id as string);
  const { data: pages } = usePageListByDirectoryId(id as string);

  return (
    <LoginRequiredWrapper>
      <DashBoardLayout>
        <div className="p-3">
          {directory != null && (
            <div className="d-md-flex align-items-center mb-3">
              <h1>{directory?.name}</h1>
              <div className="ms-auto d-flex flex-column text-end">
                <small>CreatedAt: {format(new Date(directory?.createdAt), FORMAT)}</small>
                <small>UpdatedAt: {format(new Date(directory?.updatedAt), FORMAT)}</small>
              </div>
            </div>
          )}
          {pages != null && (
            <div className="row">
              {pages.map((page) => (
                <div className="col-xl-4 col-md-6 mb-3" key={page._id}>
                  <OgpCard page={page} />
                </div>
              ))}
            </div>
          )}
        </div>
      </DashBoardLayout>
    </LoginRequiredWrapper>
  );
};

export default Index;
