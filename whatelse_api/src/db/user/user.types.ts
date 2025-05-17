export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

export type LoginUserInput = {
  email: string;
  password: string;
};

export type ConnectedUser = {
  id: string;
  name: string;
  email: string;
  token: string;
};

export type PublicUser = {
  id: string;
  name: string;
  email: string;
}