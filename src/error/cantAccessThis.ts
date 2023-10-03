import { MyError } from "@/protocols";
import httpStatus from "http-status";

export function cantAccessThis(str:string): MyError {
    return {
      code: httpStatus.UNAUTHORIZED,
      content: {
        name: `cantAccessThis${str}`,
        message: `This ${str} isn't yours!`,
      }
    }
  }
  