import { ReactNode, useCallback } from 'react';

import { Button, Grid } from '@nextui-org/react';
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
  const { data: magazinePagination } = useMagazinePagination({
    activePage: 1,
    limit: 10,
    sort: 'updatedAt',
    searchKeyword: '',
  });

  console.log(magazinePagination);

  const { handleModal } = useModal();

  const handleClickAddMagazineButton = useCallback(() => {
    handleModal({ name: 'EditMagazineModal', args: {} });
  }, [handleModal]);

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.home}`} />
      <LoginRequiredWrapper>
        <Grid css={{ width: '100%' }}>
          <Grid css={{ display: 'flex', alignItems: 'center' }}>
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
        </Grid>
      </LoginRequiredWrapper>
    </>
  );
};

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

Index.getLayout = getLayout;
export default Index;
