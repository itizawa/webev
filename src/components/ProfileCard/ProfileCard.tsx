import { signOut, Session } from 'next-auth/client';
import { VFC } from 'react';

type Props = {
  session: Session;
};

export const ProfileCard: VFC<Props> = (props: Props) => {
  console.log(props);
  return (
    <span className="mb-0 text-white c-pointer" onClick={() => signOut()}>
      Logout
    </span>
  );
};
