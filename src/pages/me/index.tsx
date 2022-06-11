import { ReactNode } from 'react';

import { Card, Grid } from '@nextui-org/react';
import { format } from 'date-fns';
import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { useLocale } from '~/hooks/useLocale';

import { WebevNextPage } from '~/libs/interfaces/webevNextPage';

import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { DashBoardLayout } from '~/components/common/Layout/DashBoardLayout';

import { useCurrentUser } from '~/stores/User';

import { Avatar, Loading, Text } from '~/components/uiParts';
import { usePagesCountByUserId } from '~/stores/Page';

const Page: WebevNextPage = () => {
  const { t } = useLocale();

  const { data: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
  const { data: count } = usePagesCountByUserId(currentUser?.id);

  // const { mutate: mutateApiToken, isValidating: isValidatingApiToken } = useApiToken();

  // const updateProfile = (newObject: Partial<User>): void => {
  //   try {
  //     restClient.apiPut<User>('/users/me', { property: newObject });
  //   } catch (err) {
  //     if (err instanceof Error) toastError(err);
  //   }
  // };
  // const debounceUpdateProfile = useDebouncedCallback(updateProfile, 300);

  if (isLoadingCurrentUser) {
    return (
      <Grid css={{ display: 'flex', justifyContent: 'center' }}>
        <Loading color="secondary" size="xl" />
      </Grid>
    );
  }

  if (!currentUser) {
    return null;
  }

  // const changeProfile = (newObject: Partial<User>): void => {
  //   mutateCurrentUser({ ...currentUser, ...newObject }, false);
  //   debounceUpdateProfile(newObject);
  // };

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.user}${t.settings}`} />
      <LoginRequiredWrapper>
        <Grid css={{ width: '100%', textAlign: 'center', display: 'flex', justifyContent: 'center', pt: '$10' }}>
          <Card css={{ overflow: 'unset', maxWidth: '500px' }}>
            <Card.Body css={{ overflow: 'unset' }}>
              <Grid
                css={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translate(-50%, -40px)',
                  display: 'flex',
                  justifyContent: 'center',
                  zIndex: 1000,
                }}
              >
                <Avatar text={currentUser.username} src={currentUser.profileUrl} bordered color="gradient" pointer as="div" size="xl" />
              </Grid>
              <Text h3 css={{ mt: '$10', textAlign: 'center' }}>
                {currentUser.username}
              </Text>
              <Grid css={{ mt: '$10', display: 'flex', justifyContent: 'space-between' }}>
                <Text css={{ fontSize: '14px' }}>保存したページ件数</Text>
                <Text css={{ color: '$gray600', fontWeight: '$bold', fontSize: '14px' }}>{count}ページ</Text>
              </Grid>
              <Grid css={{ mt: '$4', display: 'flex', justifyContent: 'space-between' }}>
                <Text css={{ fontSize: '14px' }}>登録日</Text>
                <Text css={{ color: '$gray600', fontWeight: '$bold', fontSize: '14px' }}>
                  {format(new Date(currentUser.createdAt), 'yyyy/MM/dd HH:hh:ss')}
                </Text>
              </Grid>
              <Grid css={{ mt: '$4', display: 'flex', justifyContent: 'space-between' }}>
                <Text css={{ fontSize: '14px' }}>メールアドレス</Text>
                <Text css={{ color: '$gray600', fontWeight: '$bold', fontSize: '14px' }}>{currentUser.email}</Text>
              </Grid>
            </Card.Body>
          </Card>
        </Grid>

        {/* <div className="row mt-3">
          <div className="col-md-3 col-12 text-center mb-3"></div>
          <div className="col-md-9 col-12 d-flex flex-column gap-2">
            <EditableInput onChange={(inputValue) => changeProfile({ name: inputValue })} value={currentUser.name} isHeader />
            <EditableTextarea
              value={currentUser.description}
              onChange={(inputValue) => changeProfile({ description: inputValue })}
              placeholder={t.no_description}
            />
          </div>
        </div> */}
      </LoginRequiredWrapper>
    </>
  );
};

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

Page.getLayout = getLayout;
export default Page;
