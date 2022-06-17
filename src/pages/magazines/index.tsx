import { ReactNode, useCallback, useState } from 'react';

import { Button, Grid, Pagination, Table } from '@nextui-org/react';
import { format } from 'date-fns';
import { WebevOgpHead } from '~/components/common/WebevOgpHead';

import { WebevNextPage } from '~/libs/interfaces/webevNextPage';

import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { DashBoardLayout } from '~/components/common/Layout/DashBoardLayout';
import { useLocale } from '~/hooks/useLocale';
import { Text } from '~/components/uiParts';
import { Icon } from '~/components/base/atoms/Icon';
import { useModal } from '~/hooks/useModal';
import { useMagazinePagination } from '~/stores/Magazine';

const Index: WebevNextPage = () => {
  const { t } = useLocale();
  const [activePage, setActivePage] = useState(1);
  const {
    data: magazinePagination,
    mutate: mutateMagazinePagination,
    isLoading,
  } = useMagazinePagination({
    activePage: activePage,
    limit: 10,
    sort: 'updatedAt',
    searchKeyword: '',
  });

  const { handleModal } = useModal();

  const handleClickAddMagazineButton = useCallback(() => {
    handleModal({ name: 'EditMagazineModal', args: { onSubmit: () => mutateMagazinePagination() } });
  }, [handleModal, mutateMagazinePagination]);

  const handleMutateActivePage = (page: number) => {
    setActivePage(page);
  };

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.magazine}`} />
      <LoginRequiredWrapper>
        <Grid css={{ width: '100%' }}>
          <Grid css={{ display: 'flex', alignItems: 'center', mb: '16px' }}>
            <Text h2>{t.magazine}</Text>
            <Button
              size="sm"
              css={{ fontWeight: 'bold', ml: 'auto' }}
              color="secondary"
              icon={<Icon icon="PENCIL" />}
              onClick={handleClickAddMagazineButton}
            >
              Add
            </Button>
          </Grid>
          <Table
            fixed
            color="secondary"
            css={{
              bgColor: '#202020',
              minHeight: 'auto',
              minWidth: '100%',
            }}
          >
            <Table.Header>
              <Table.Column css={{ width: '30%' }}>TITLE</Table.Column>
              <Table.Column css={{ width: '30%' }}>DESCRIPTION</Table.Column>
              <Table.Column>STATUS</Table.Column>
              <Table.Column>UPDATE</Table.Column>
              <Table.Column>MANAGE</Table.Column>
            </Table.Header>
            <Table.Body items={magazinePagination?.docs || []} loadingState={isLoading ? 'loading' : 'idle'}>
              {(magazine) => (
                <Table.Row key={magazine.id}>
                  <Table.Cell>
                    <Text
                      b
                      css={{
                        whiteSpace: 'pre-wrap',
                        color: '$white',
                        display: '-webkit-box',
                        overflow: 'hidden',
                        overflowWrap: 'anywhere',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 1,
                      }}
                    >
                      {magazine.name}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text
                      css={{
                        whiteSpace: 'pre-wrap',
                        color: '$white',
                        display: '-webkit-box',
                        overflow: 'hidden',
                        overflowWrap: 'anywhere',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                      }}
                    >
                      {magazine.description}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>Active</Table.Cell>
                  <Table.Cell>{format(new Date(magazine.createdAt), 'yyyy/MM/dd')}</Table.Cell>
                  <Table.Cell>Active</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
          <Grid css={{ display: 'flex', justifyContent: 'center', mt: '$10' }}>
            <Pagination
              shadow
              page={activePage}
              initialPage={1}
              color="secondary"
              total={magazinePagination?.totalPages}
              onChange={handleMutateActivePage}
            />
          </Grid>
        </Grid>
      </LoginRequiredWrapper>
    </>
  );
};

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

Index.getLayout = getLayout;
export default Index;
