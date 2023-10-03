import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { duplicatedEmailError, invalidCredentialsError } from './errors';
import { exclude } from '@/util/prisma-utils';
import authRepository from '@/repository/auth-repository';

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  return {
    user: exclude(user, 'password'),
    token,
  };
}

export async function createUser({ email, password }: CreateUserParams): Promise<User> {
  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return authRepository.account.create({
    email,
    password: hashedPassword,
  });
}
async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await authRepository.account.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}


async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await authRepository.account.findByEmail(email, { id: true, email: true, password: true });
  if (!user) throw invalidCredentialsError();

  return user;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await authRepository.session.create({
    token,
    userId,
  });

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

export type CreateUserParams = Pick<User, 'email' | 'password'>;

export type SignInParams = Pick<User, 'email' | 'password'>;

type SignInResult = {
  user: Pick<User, 'id' | 'email'>;
  token: string;
};

type GetUserOrFailResult = Pick<User, 'id' | 'email' | 'password'>;

const authenticationService = {
  signIn,
  createUser,
};

export default authenticationService;