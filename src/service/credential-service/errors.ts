import { MyError } from "@/protocols";
import httpStatus from "http-status";

export function duplicatedCredential(): MyError {
  return {
    code: httpStatus.CONFLICT,
    content: {
      name: 'duplicatedCredentialCreation',
      message: "Can't create credentials with same title",
    }
  }
}