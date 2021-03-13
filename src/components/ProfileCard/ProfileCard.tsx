import { signOut, Session } from 'next-auth/client';
import { VFC } from 'react';
import { UserIcon } from '~/components/Icons/UserIcon';

type Props = {
  session: Session;
};

export const ProfileCard: VFC<Props> = (props: Props) => {
  const { user } = props.session;
  return (
    <UserIcon />
    // <span className="mb-0 text-white c-pointer" onClick={() => signOut()}>
    //   Logout
    // </span>
  );
};
