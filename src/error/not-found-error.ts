import { MyError } from '@/protocols';
import httpStatus from 'http-status';

export function notFoundError(): MyError {
  return {
    code: httpStatus.NOT_FOUND,
    content: {
      name: 'NotFoundError',
      message: 'No result for this search!',
    }
  }
}
