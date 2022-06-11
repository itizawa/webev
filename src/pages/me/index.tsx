import { ReactNode } from 'react';

import { Grid } from '@nextui-org/react';
import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { useLocale } from '~/hooks/useLocale';

import { WebevNextPage } from '~/libs/interfaces/webevNextPage';

import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { DashBoardLayout } from '~/components/common/Layout/DashBoardLayout';

import { useCurrentUser } from '~/stores/User';

import { Avatar, Loading, Text } from '~/components/uiParts';
import { usePagesCountByUserId } from '~/stores/NewPage';

const Page: WebevNextPage = () => {
  const { t } = useLocale();

  const { data: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
  const { data: count } = usePagesCountByUserId(currentUser?.id);
  console.log(count);

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
        <Grid>
          <Grid css={{ display: 'flex', justifyContent: 'center', gap: '$8' }}>
            <Avatar text={currentUser.username} src={currentUser.profileUrl} bordered color="secondary" pointer as="div" />
            <Text h3>{currentUser.username}</Text>
          </Grid>
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
