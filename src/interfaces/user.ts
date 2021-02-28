export interface User {
  email: string;
  name: string;
  image: string;
}

export interface Session {
  user: User;
  accessToken: string;
}
