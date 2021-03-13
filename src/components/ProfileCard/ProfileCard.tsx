import { signOut } from 'next-auth/client';
import { VFC } from 'react';
import { UserIcon } from '~/components/Icons/UserIcon';
import { User } from '~/interfaces/user';

type Props = {
  user: User;
};

export const ProfileCard: VFC<Props> = (props: Props) => {
  const { user } = props;

  return (
    <UserIcon image={user.image} />
    // <span className="mb-0 text-white c-pointer" onClick={() => signOut()}>
    //   Logout
    // </span>
  );
};
