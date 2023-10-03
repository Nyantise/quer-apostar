import { ApplicationError, MyError } from "@/protocols";
import httpStatus from "http-status";

export function invalidCredentialsError(): MyError {
  return {
    code: httpStatus.UNAUTHORIZED,
    content:{
    name: 'InvalidCredentialsError',
    message: 'email or password are incorrect',
    }
  }
}

export function duplicatedEmailError(): MyError {
  return {
    code: httpStatus.CONFLICT,
    content:{
      name: 'DuplicatedEmailError',
      message: 'There is already an user with given email',
    }
  }
}
