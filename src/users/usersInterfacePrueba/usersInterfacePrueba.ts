export interface User {
  id: number;

  name: string;

  email: string;

  credential: {
    id: number
    username: string;
    password: string;
  };
  address: string;

  phone: string;

  country?: string | undefined;

  city?: string | undefined;
}
export type Users = User[]